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

require 'rails_helper'

RSpec.describe Business, type: :model do

  it "has a valid factory" do
    expect(FactoryGirl.build(:business)).to be_valid
  end

  it"is invalid without a email"do
    business = FactoryGirl.build(:business,email: nil)
    business.valid?
    expect(business.errors[:email]).to include("can't be blank")
  end

  it"is invalid without a company_name"do
    business = FactoryGirl.build(:business,company_name: nil)
    business.valid?
    expect(business.errors[:company_name]).to include("can't be blank")
  end

end
