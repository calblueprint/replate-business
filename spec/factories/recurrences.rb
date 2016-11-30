# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  day        :integer          not null
#  frequency  :integer          not null
#  has_sent   :boolean          default(FALSE)
#  start_date :datetime         not null
#  exception  :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pickup_id  :integer
#  start_time :string
#  end_time   :string
#

FactoryGirl.define do
  factory :recurrence do
    
  end
end
