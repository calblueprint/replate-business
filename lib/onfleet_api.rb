# hello
require 'json'
require 'httparty'

module OnfleetAPI
  @url = 'https://onfleet.com/api/v2/tasks'
  @basic_auth = {:username => Figaro.env.ONFLEET_API_KEY, :password =>''}

  def self.make_time(date, time)
    # Onfleet takes unix time in milliseconds
    t = Time.new(date.year, date.month, date.day)
    t = Time.parse(time, t).to_i
    t * 1000
  end

  def self.build_destination(location)
    {
      :address => {
        :name => location.addr_name,
        :number => location.number,
        :street => location.street,
        :apartment => location.apt_number ? location.apt_number : '',
        :city => location.city,
        :state => location.state,
        :country => location.country
      }
    }
  end

  def self.build_recipients(business)
    [
      {
        :name => business.company_name,
        :phone => business.phone
      }
    ]
  end

  def self.build_container(recurrence)
    {
      :type => 'WORKER',
      :worker => recurrence.driver_id
    }
  end

  def self.build_data(recurrence, date)
    l = build_destination(recurrence.location)
    b = build_recipients(recurrence.business)
    p = recurrence.pickup
    c = build_container(recurrence)
    com_after = make_time(date, recurrence.start_time)
    com_before = make_time(date, recurrence.end_time)
    task = {
      :completeAfter => com_after,
      :completeBefore => com_before,
      :pickupTask => true,
      :notes => p.comments
    }
    task[:container] = c
    task[:recipients] = b
    task[:destination] = l
    task
  end

  def self.post_task(recurrence, date)
    data = build_data(recurrence, date)
    puts "<<<<<<<< API POST of recurrence with id=#{recurrence.id} to onfleet >>>>>>>>"
    HTTParty.post(@url, :body => data.to_json, :basic_auth => @basic_auth).parsed_response
  end

  def self.delete_task(id)
    HTTParty.delete("#{@url}/#{id}", :basic_auth => @basic_auth).parsed_response
  end

  def self.get_task(id)
    HTTParty.get("#{@url}/#{id}",
                 :basic_auth => @basic_auth).parsed_response
  end

  def self.get_task_shortid(id)
    HTTParty.get("#{@url}/shortId/#{id}",
                 :basic_auth => @basic_auth).parsed_response
  end

  def self.cannot_post(recurrence, date)
    # any conditions that if are true, require that post cannot happen
    cancelled_dates = []
    recurrence.cancellations.each { |c| cancelled_dates << c.date }
    cancelled_dates.include?(date) ||
    recurrence.start_day > date
  end

  def self.post_batch_task(day, date)
    # Tasks are posted the night before they are due to happen
    recurrences = Recurrence.where(day: day)
    failed = {}
    all = []
    result = {:posted => all, :failed => failed}
    recurrences.each do |r|
      next if cannot_post(r, date)
      all << r
      data = post_single_task(r, date)
      failed[r] = data['message'] if data.key?('message')
      # Throttling requires max 10 requests per second
      sleep 0.1
    end
    result
  end

  def self.post_single_task(recurrence, date)
    resp = post_task(recurrence, date)
    if resp.key?('id')
      args = {:status => 'assigned', :date => date, :onfleet_id => resp['id']}
      recurrence.create_task(args)
      if recurrence.frequency == 'one_time'
        puts 'On Demand Task:'
        Recurrence.destroy(recurrence)
      else
        recurrence.update(onfleet_id: resp['id'])
      end
      puts resp['id']
    else
      puts resp['message']
    end
    resp
  end

  def self.update_single_task(task)
    if task.onfleet_id
      resp = get_task(task.onfleet_id)
      state = resp['state'].to_i
      task.update(status: state)
    end
  end

  def self.update_batch_task
    # tasks where status is not complete, failed, or cancelled
    tasks = Task.where.not('status= 3 OR status= 4 OR status= 5')
    tasks.each do |t|
      update_single_task(t)
    end
  end
end

# puts OnfleetAPI.test
