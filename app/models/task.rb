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

class Task < ActiveRecord::Base
  belongs_to :location
  enum status: [:incomplete, :complete, :cancelled]

  def self.parse(str)
  	# parse("49: 1 tray, 2 bags of food, 23 pounds of potatoes")
  	# >>> { "pounds" => 49, "descriptive_string" => "1 tray, 2 bags of food, 23 pounds of potatoes" }
  	split = str.split(":")
  	estimate = split[0].strip
  	descriptive_string = split[1].strip
  	return { "pounds" => Integer(estimate), "descriptive_string" => descriptive_string }
  end
end
