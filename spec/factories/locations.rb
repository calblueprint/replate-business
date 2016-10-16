# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  number     :string
#  street     :string
#  city       :string
#  country    :string
#  addr_name  :string
#  apt_number :string
#  state      :string
#  zip        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :location do
    
  end
end
