# == Schema Information
#
# Table name: requests
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  food_type   :integer          not null
#  caterer     :string           not null
#  comments    :text
#  location_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :request do
    
  end
end
