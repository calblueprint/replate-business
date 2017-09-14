# == Schema Information
#
# Table name: businesses
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  company_name           :string
#  phone                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  onfleet_id             :string
#  website_url            :string
#

class Business < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :locations, :dependent => :destroy
  validates_presence_of :company_name, :phone

  def invoice_data
    tasks = locations.collect { |x| x.tasks.where(paid: false, status: 1, invoice_number: nil) }.flatten
    InvoicedAPI.invoice_data(tasks)
  end

  def set_invoiced_id
      invoiced = Invoiced::Client.new(Figaro.env.INVOICED_API_KEY)
      return if self.invoiced_id
      response = invoiced.Customer.create(
        name: company_name,
        email: email,
        phone: phone
      )
      puts response
      self.invoiced_id = response.id
      self.save
  end

  def make_invoice
    invoiced = Invoiced::Client.new(Figaro.env.INVOICED_API_KEY)
    if invoice_data != []
      invoicey = invoiced.Invoice.create(
        customer: invoiced_id,
        payment_terms: 'NET 14',
        items: invoice_data,
        autopay: false
      )
    end

    tasks = locations.collect { |x| x.tasks.where(paid: false, status: 1, invoice_number: nil) }.flatten
    tasks.each do |task|
      task.invoice_number = invoicey[:id]
      task.save
    end
  end
end
