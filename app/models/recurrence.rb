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

  # Temporary assignment method since no load balancing drivers yet
  def assign_driver
    if self.location == 'California' or self.location == 'CA'
      self.driver_id = 'Wxi7dpU3VBVSQoEnG3CgMRjG'
    else
      self.driver_id = 'PWWyG9w4KS44JOlo2j2Dv8qT'

  def same_week(d)
    today = Date.parse(d)
    start_date = self.start_date.to_date
    epoch = Date.new(1970,1,1)
    same_week = today.strftime('%U') == start_date.strftime('%U')
    same_year = today.strftime('%Y') == start_date.strftime('%Y')

    if self.frequency === 1
      if same_week
        return today.wday <= Recurrence.days[self.day]
      elsif today >= start_date
        return true
      end
    end

    if self.frequency === 0 and same_week and same_year
      return true
    end
    # Write this method in the eventually
    # if self.frequency == 2
    #   ...
    return false
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
>>>>>>> 70121e53cc1fc80de5520ddd8ea28bd72fba102f
    end
  end

  def create_task(status, date, onfleet_id=nil)
    Task.create(scheduled_date: date,
                onfleet_id: onfleet_id,
                status: status,
                driver: self.driver_id,
                location_id: self.location.id)
  end

  def cancel
    o_id = self.onfleet_id
    if o_id
      # Try to remove from onfleet: will only be removed if task
      # is not completed
      resp = OnfleetAPI.delete_task(o_id)
      unless resp
        Task.where(onfleet_id: o_id).update(status: 'cancelled')
        return
      end
    end
    # if nothing was removed from onfleet the set the task to be cancelled
    # since it has not been posted yet
    self.cancel = true
  end
end
