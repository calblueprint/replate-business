# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  day        :integer          not null
#  start_time :datetime         not null
#  end_time   :datetime         not null
#  frequency  :integer          not null
#  has_sent   :boolean          default(FALSE)
#  start_date :datetime         not null
#  exception  :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  request_id :integer
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

  def post_daily_task
    today = Time.now.wday - 1
    recurrences = Recurrence.where(day: today, exception: 0)
    recurrences.each do |r|
      resp = OnfleetAPI.post_task(r)
      sleep 0.2
    end
  end
end
