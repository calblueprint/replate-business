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
  enum status: [:unassigned, :assigned, :active, :completed, :failed, :cancelled]

  def self.parse(tray_string)
  	# parse("1 tray, 2 bags of food, 23 pounds of potatoes")
  	# >>> 26
  	trays = tray_string.split(",")
  	num_trays = 0
  	trays.each do |tray|
  		tray.strip!
  		x = /\d+/.match(tray).try(:[], 0)
  		num_trays += Integer(x)
  	end
  	return num_trays
  end
end
