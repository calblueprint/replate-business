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

FactoryGirl.define do
  factory :location do
      number "611"
      street "West Temple"
      city "Salt Lake City"
      state "Utah"
      zip "84101"
      country "United States"
      addr_name "TEST DO NOT DELIVER"
      lat 40.760800
      lon -111.891000
  end
end
