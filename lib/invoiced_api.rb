require 'jwt'
require 'invoiced'

module InvoicedAPI
  @invoiced = Invoiced::Client.new(Figaro.env.INVOICED_API_KEY, true)

  def self.signin_url(business)
    # Gets the invoice sign in for client
    sso_key = Figaro.env.INVOICED_SSO_KEY
    exp = Time.now + 86_400 # link expires in 1 day
    payload = {
      sub: business.invoiced_id,
      iss: 'Ruby Backend',
      exp: exp.to_i
    }
    token = JWT.encode payload, sso_key, 'HS256'
    url = "https://replate.invoiced.com/login/#{token}"
    puts url
  end

  def self.paid_tasks(tasks)
    invoices = tasks.uniq.pluck(:invoice_number)
    invoices.each do |i|
      if !i.nil?
        items_invoiced = tasks.where(invoice_number: i).count
        val = tasks.find_by('invoice_number = ?', i).location.is_large ? 40 : 30
        @invoiced.Transaction.create(invoice: i, amount: (items_invoiced * val))
      else
        uninvoiced = tasks.where(invoice_number: nil)
        data = invoice_data(uninvoiced)
        invoiced_id = tasks.last.location.business.invoiced_id
        invoicey = @invoiced.Invoice.create(
          customer: invoiced_id,
          payment_terms: 'NET 14',
          items: data,
          autopay: false
        )
        val = uninvoiced.first.is_large ? 40 : 30
        @invoiced.Transaction.create(invoice: invoicey.id, amount: (uninvoiced.count * val))
        uninvoiced.update_all(invoice_number: invoicey.id)
      end
    end
  end

  def self.invoice_data(tasks)
    items_builder = []
    tasks.each do |t|
      item = {}
      item[:name] = t.scheduled_date.strftime('Pickup on %a %m/%d/%Y')
      item[:name] += ' Location: ' + t.location.addr_name
      item[:quantity] = 1
      item[:unit_cost] = t.location.is_large ? 40 : 30
      items_builder << item
    end
    items_builder
  end

  def self.customers
    customers, metadata = @invoiced.Customer.list()
    puts "x" * 1000
    customers.each{|x| puts x.name + ":   " + (x.id).to_s }
  end
end
