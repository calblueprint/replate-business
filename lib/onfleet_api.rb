# hello
require 'json'
require 'httparty'

module OnfleetAPI
  @url = "https://onfleet.com/api/v2/tasks"
  @basic_auth = {:username => Figaro.env.ONFLEET_API_KEY, :password =>''}
  def self.test
    'hello'
  end

  def self.make_time(time)
    now = Time.now
    t = Time.parse(time, now).to_i
    t * 1000
  end

  def self.build_data(recurrence)
    l = recurrence.location
    b = recurrence.business
    p = recurrence.pickup
    com_after = make_time(recurrence.start_time)
    com_before = make_time(recurrence.end_time)
    task = {
    :destination => {
      :address => {
        :name => l.addr_name,
        :number => l.number,
        :street => l.street,
        :apartment => l.apt_number ? l.apt_number : '',
        :city => l.city,
        :state => l.state,
        :country => l.country
        # :unparsed => "2333 Channing way, apartment #24, Berkeley, CA, USA"
      }
    },
    :recipients => [
      {
        :name => b.company_name,
        :phone => b.phone
      }
    ],
    :completeAfter => com_after,
    :completeBefore => com_before,
    :pickupTask => true,
    :notes => p.comments,
    :container => {
      :type => 'WORKER',
      :worker => 'Wxi7dpU3VBVSQoEnG3CgMRjG'
    }
    }
  end

  def self.post_task(recurrence)
    data = build_data(recurrence)
    resp = HTTParty.post(@url, :body => data.to_json, :basic_auth => @basic_auth)
  end
end

# puts OnfleetAPI.test
