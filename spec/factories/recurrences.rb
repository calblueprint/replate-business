# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  day        :integer
#  starttime  :datetime
#  endtime    :datetime
#  frequency  :integer
#  has_sent   :boolean
#  startdate  :datetime
#  exception  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :recurrence do
    
  end
end
