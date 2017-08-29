require 'jwt'
require 'invoiced'

module InvoicedAPI
  @invoiced = Invoiced::Client.new(Figaro.env.INVOICED_API_KEY, true)

  def self.signin_url(business)
    # Gets the invoice sign in for client
    sso_key = Figaro.env.INVOICED_SSO_KEY
    exp = Time.now + 86_400 # link expires in 1 day

    payload = {
      sub: business.invoiced_id, # invoiced customer ID
      iss: 'Ruby Backend',
      exp: exp.to_i
    }

    token = JWT.encode payload, sso_key, 'HS256'
    url = "https://replate.invoiced.com/login/#{token}"
    puts url
  end
end
