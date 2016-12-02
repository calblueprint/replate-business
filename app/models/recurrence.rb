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

  def self.post_batch_task(day)
    recurrences = Recurrence.where(day: day)
    f = []
    recurrences.each do |r|
      r.update(task_id: nil)
      if r.cancel
        r.update(cancel: false)
        next
      else
        resp = OnfleetAPI.post_task(r)
      end
      if resp.key?('id')
        task_id = resp["id"]
        r.update(task_id: task_id)
      else
        f << {:failed => r.id, :message => resp["message"]}
      end
      # Throttling requires max 10 requests per second
      # pausing every .2 to prevent API key lock since sleep is not exact
      sleep 0.2
    end
    f
  end

  def self.get_daily_task
    recurrences = Recurrence.where(day: day)
    recurrences.each do |r|
      if r.task_id
        resp = self.get_task(r.task_id)
      end
    end
  end

  def self.post_daily_task
    today = Time.now.wday - 1
    post_batch_task(today)
  end
end
