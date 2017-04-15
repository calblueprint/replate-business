# == Schema Information
#
# Table name: pickups
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  comments    :text
#  location_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Pickup < ActiveRecord::Base
  belongs_to :location
  has_many :recurrences, :dependent => :destroy

  def cancel_notification
    self.recurrences.each do |recurrence|
    	recurrence.cancel_notification
    end
  end
end
