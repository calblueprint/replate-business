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

  def self.post_batch_task(day, tomorrow)
    # Tasks are posted the night before they are due to happen

    recurrences = Recurrence.where(day: day)
    failed = []
    recurrences.each do |r|
      if r.cancel || r.startdate > tomorrow + 1
        r.update(cancel: false)
        next
      end
      result = post_single_task(r, tomorrow)
      if result.key?('message')
        failed << {:recurrence => r, :message => result['message']}
      end
      # Throttling requires max 10 requests per second
      sleep 0.1
    end
    failed
  end

  def self.post_single_task(recurrence, date)
    resp = post_task(recurrence, date)
    if resp.key?('id')
      recurrence.create_task('assigned', date, resp['id'])
      recurrence.update(onfleet_id: resp['id'])
    else
      recurrence.create_task('failed', date)
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
