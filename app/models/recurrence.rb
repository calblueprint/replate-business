# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  day        :integer          not null
#  frequency  :integer          not null
#  has_sent   :boolean          default(FALSE)
#  start_date :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pickup_id  :integer
#  start_time :string
#  end_time   :string
#  cancel     :boolean          default(FALSE), not null
#  driver_id  :string           default(""), not null
#  task_id    :string
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

  def assign_driver
    if self.location == "California" or self.location "CA"
      self.driver_id = "Wxi7dpU3VBVSQoEnG3CgMRjG"
    else
      self.driver_id = "fOx8*EM~ESLfxUhdVbDGu5jt"
    end
  end

  def self.post_daily_task
    today = Time.now.wday - 1
    Onfleet_task.post_batch_task(today)
  end
end
