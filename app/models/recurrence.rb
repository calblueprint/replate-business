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
