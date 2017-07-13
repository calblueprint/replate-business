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

FactoryGirl.define do
  factory :business do
    sequence(:email) { |n| "johndoe#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    company_name Faker::Company.name
    phone '925-222-2342'
    onfleet_id 'siouhasdfo'
  end
end
