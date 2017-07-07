# == Schema Information
#
# Table name: locations
#
#  id                 :integer          not null, primary key
#  number             :string           not null
#  street             :string           not null
#  city               :string           not null
#  country            :string           not null
#  addr_name          :string
#  apt_number         :string
#  state              :string
#  zip                :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  business_id        :integer
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

require 'rails_helper'

RSpec.describe Location, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.build(:location)).to be_valid
  end
  it"is invalid without a addr_name"do
    location = FactoryGirl.build(:location, addr_name: nil)
    location.valid?
    expect(location.errors[:addr_name]).to include("can't be blank")
  end
end
