# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  scheduled_date :datetime         not null
#  onfleet_id     :string
#  status         :integer          not null
#  driver         :integer          not null
#  location_id    :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryGirl.define do
  factory :task do
    
  end
end
