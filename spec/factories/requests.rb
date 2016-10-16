# == Schema Information
#
# Table name: requests
#
#  id          :integer          not null, primary key
#  title       :string
#  food_type   :integer
#  caterer     :string
#  comments    :text
#  location_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :request do
    
  end
end
