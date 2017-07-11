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

  it 'has a valid factory' do
    expect(build(:location)).to be_valid
  end

  it 'is invalid without a addr_name' do
    location = build(:location, addr_name: nil)
    location.valid?
    expect(location.errors[:addr_name]).to include("can't be blank")
  end

  it 'is invalid with a duplicate email address' do
    location = create(:location, email: 'bunny@cat.com')
    location2 = location.dup
    location2.valid?
    expect(location2.errors[:email]).to include('has already been taken')
  end

  it 'has a valid address method' do
    location = build(:location)
    location.valid?
    expect(location.address).to include('611 West Temple Salt Lake City Utah 84101')
  end

  it 'has a valid line1 method' do
    location = build(:location)
    location.valid?
    expect(location.line1).to include('611 West Temple')
  end

  it 'has a valid line2 method' do
    location = build(:location)
    location.valid?
    expect(location.line2).to include('A')
  end

end
