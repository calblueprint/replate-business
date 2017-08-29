require 'jwt'
require  'invoiced'


module InvoicedAPI

  def self.make_time(business)
    # Onfleet takes unix time in milliseconds
    sso_key = Figaro.env.INVOICED_SSO_KEY

    exp = Time.now + 86400 # link expires in 1 day

    payload = {
        :sub => business.invoiced_id, # invoiced customer ID
        :iss => "Ruby Backend",
        :exp => exp.to_i
    }

    token = JWT.encode payload, sso_key, 'HS256'


    url = "https://replate.invoiced.com/login/#{token}"
  end

end
