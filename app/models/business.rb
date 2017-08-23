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


  def invoice
    tasks = self.locations.collect{|x| x.tasks.where(paid: false).where(status: 1).where(invoice_number: nil)}.flatten
    items_builder = []

    tasks.each{|t|
      item = {}
      item[:name] = t.scheduled_date.strftime("Pickup on %a  %m/%d/%Y")
      item[:quantity] = 1
      if t.location.is_large
        item[:unit_cost] = 40
      else
        item[:unit_cost] = 30
      end

       items_builder << item
     }
     return items_builder
  end


end
