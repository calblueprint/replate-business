# hello
require 'json'
require 'httparty'

module OnfleetAPI
  @url = 'https://onfleet.com/api/v2/tasks'
  @basic_auth = {:username => Figaro.env.ONFLEET_API_KEY, :password =>''}

  def self.make_time(date, time, location)
    # Onfleet takes unix time in milliseconds
    zip = location.zip
    timezone = ZipCodes.identify(zip)[:time_zone]
    Time.use_zone(timezone) do
      t = Time.zone.local(date.year, date.month, date.day)
      t = Time.zone.parse(time, t)
      t.to_i * 1000
    end
  end

  def self.build_destination(location)
    addr_string = location.number + ' ' + location.street + " " + location.city + ", " + location.state
    {
      :address => {
        :name => location.addr_name + ', ' + addr_string,
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

  def self.build_task(recurrence, date)
    p = recurrence.pickup
    com_after = make_time(date, recurrence.start_time, recurrence.location)
    com_before = make_time(date, recurrence.end_time, recurrence.location)
    task = {
      :completeAfter => com_after,
      :completeBefore => com_before,
      :pickupTask => true,
      :notes => p.comments
    }
  end

  def self.build_data(recurrence, date)
    l = build_destination(recurrence.location)
    b = build_recipients(recurrence.business)
    c = build_container(recurrence)
    t = build_task(recurrence, date)
    task = t
    task[:container] = c
    task[:recipients] = b
    task[:destination] = l
    task
  end

  def self.post_task(recurrence, date)
    data = build_data(recurrence, date)
    puts "<<<<<<<< API POST of recurrence with id=#{recurrence.id} to onfleet >>>>>>>>"
    HTTParty.post(@url, :body => data.to_json, :basic_auth => @basic_auth)
  end

  def self.delete_task(id)
    puts "<<<<<<<< API DELETE of recurrence with id=#{id} from onfleet >>>>>>>>"
    HTTParty.delete("#{@url}/#{id}", :basic_auth => @basic_auth)
  end

  def self.get_task(id)
    HTTParty.get("#{@url}/#{id}",
                 :basic_auth => @basic_auth).parsed_response
  end

  def self.update_task(recurrence, date, id)
    data = build_task(recurrence, date)
    puts "<<<<<<<< API PUT of recurrence with id=#{recurrence.id} to onfleet >>>>>>>>"
    HTTParty.put("#{@url}/#{id}",
                 :body => data.to_json,
                 :basic_auth => @basic_auth).parsed_response
  end

  def self.update_single_task(recurrence, date, id)
    resp = update_task(recurrence, date, id)
  end

  def self.get_task_shortid(id)
    HTTParty.get("#{@url}/shortId/#{id}",
                 :basic_auth => @basic_auth).parsed_response
  end

  def self.cannot_post(recurrence, date)
    # any conditions that if are true, require that post cannot happen
    recurrence.cancellations.where(date: date).size > 0 ||
    recurrence.start_day > date
  end

  def self.post_batch_task(day, date)
    # Tasks are posted the night before they are due to happen
    recurrences = Recurrence.where(day: day)
    failed = {}
    all = []
    result = {:posted => all, :failed => failed}
    recurrences.each do |r|
      if cannot_post(r, date)
        next
      end
      all << r
      resp = post_single_task(r, date)
      failed[r] = resp.parsed_response['message'] unless resp.code == 200
      # Throttling requires max 10 requests per second
      sleep 0.1
    end
    result
  end

  def self.cancel_single_task(onfleet_id)
    resp = delete_task(onfleet_id)
    puts resp.parsed_response
    case resp.code
      when 200
        return true
    end
    return false
  end

  def self.post_single_task(recurrence, date)
    resp = post_task(recurrence, date)
    puts resp.parsed_response
    case resp.code
      when 200
        resp = resp.parsed_response
        location_id = recurrence.location.id
        args = {:status => 'incomplete', \
                :scheduled_date => date, \
                :onfleet_id => resp['id'], \
                :location_id => location_id, \
                :driver => resp['worker'], \
                :short_id => resp['shortId']}

        task = Task.new(args)
        task.save
        recurrence.update(onfleet_id: resp['id'])
      when 404
        # resource not found
        puts "O noes not found!"
      when 300...600
        # error message to propogate
        resp = resp.parsed_response
        message = resp['message']['cause']
        puts "ZOMG ERROR #{resp}"
        recurrence.errors.add(:base, message)
    end
    resp
  end

end

# puts OnfleetAPI.test
