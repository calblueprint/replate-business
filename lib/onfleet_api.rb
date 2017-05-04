# hello
require 'json'
require 'httparty'

module OnfleetAPI
  @url = 'https://onfleet.com/api/v2/tasks'
  @basic_auth = {:username => Figaro.env.ONFLEET_API_KEY, :password =>''}

  def self.make_time(date, time)
    # Onfleet takes unix time in milliseconds
    Time.zone = TZInfo::Timezone.get('America/Los_Angeles')
    t = Time.zone.local(date.year, date.month, date.day)
    t = Time.zone.parse(time, t).utc
    puts t
    t.to_i * 1000
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

  def self.build_task(recurrence, date)
    p = recurrence.pickup
    com_after = make_time(date, recurrence.start_time)
    com_before = make_time(date, recurrence.end_time)
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
    HTTParty.delete("#{@url}/#{id}", :basic_auth => @basic_auth).parsed_response
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
      data = post_single_task(r, date)
      failed[r] = data['message'] if data.key?('message')
      # Throttling requires max 10 requests per second
      sleep 0.1
    end
    result
  end
#     t.datetime "scheduled_date",              null: false
    # t.string   "onfleet_id"
    # t.integer  "status",                      null: false
    # t.integer  "driver",                      null: false
    # t.integer  "location_id",                 null: false
    # t.datetime "created_at",                  null: false
    # t.datetime "updated_at",                  null: false
    # t.text     "description"
    # t.integer  "trays_donated"
    # t.string   "short_id",
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
                :location_id => location_id}

        task = Task.new(args)
        task.save
      when 404
        # resource not found
        puts "O noes not found!"
      when 300...600
        # error message to propogate
        puts "ZOMG ERROR #{response.code}"
    end
    # if resp.key?('id')
    #   args = {:status => 'assigned', :date => date, :onfleet_id => resp['id']}
    #   recurrence.create_task(args)
    #   if recurrence.frequency == 'one_time'
    #     puts 'On Demand Task:'
    #   end
    #   recurrence.update(onfleet_id: resp['id'])
    # end
    # puts resp
    # resp
  end

end

# puts OnfleetAPI.test
