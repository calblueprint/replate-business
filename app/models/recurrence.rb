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

class Recurrence < ActiveRecord::Base
  belongs_to :pickup
  enum day: [:monday, :tuesday, :wednesday, :thursday, :friday]

  def location
    self.pickup.location
  end

  def business
    self.pickup.location.business
  end
end
