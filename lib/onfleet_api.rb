# hello
require 'json'
require 'httparty'

module OnfleetAPI
  @url = "https://onfleet.com/api/v2/tasks"
  @basic_auth = {:username => Figaro.env.ONFLEET_API_KEY, :password =>''}

  def self.make_time(time)
    # Time for Onfleet is in  milliseconds. Date represents tomorrow
    # since tasks are being posted to onfleet the night before
    # they are required to be executed
    t = Time.new(Time.new.year, Time.new.month, Time.new.day + 1)
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

  def self.test
    puts "HELLO"
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

  def self.build_data(recurrence)
    test
    l = build_destination(recurrence.location)
    b = build_recipients(recurrence.business)
    p = recurrence.pickup
    c = build_container(recurrence)
    com_after = make_time(recurrence.start_time)
    com_before = make_time(recurrence.end_time)
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

  def self.post_task(recurrence)
    data = build_data(recurrence)
    resp = HTTParty.post(@url, :body => data.to_json, :basic_auth => @basic_auth).parsed_response
  end

  def self.delete_task(id)
    resp = HTTParty.delete("#{@url}/#{id}", :basic_auth => @basic_auth).parsed_response
  end

  def self.get_task(id)
    resp = HTTParty.get("#{@url}/#{id}", :basic_auth => @basic_auth).parsed_response
  end

  def self.get_task_shortid(id)
    resp = HTTParty.get("#{@url}/shortId/#{id}", :basic_auth => @basic_auth).parsed_response
  end
end

# puts OnfleetAPI.test
