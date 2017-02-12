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

  def is_on_demand?
    r_date = DateTime.new(self.start_date.year, self.start_date.month, self.start_date.day)
    today == Date.today
  end

  def post_on_demand
    OnfleetAPI.post_single_task(self, Date.today)
    args = {:date => Date.today, :tasks =>[self]}
    ExportAllRecurrences.new(args).export_on_demand_task
  end

  # Temporary assignment method since no load balancing drivers yet
  def assign_driver
    if self.location == 'California' or self.location == 'CA'
      self.driver_id = 'Wxi7dpU3VBVSQoEnG3CgMRjG'
    else
      self.driver_id = 'PWWyG9w4KS44JOlo2j2Dv8qT'
    end
  end

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

  # args is hash:
  # args[:status] = string value of status enum, see Task model
  # args[:date] = date task was originally destined for
  # args[:onfleet_id] = onfleet id of task if succesfully posted
  def create_task(args)
    Task.create(scheduled_date: args[:date],
                onfleet_id: args[:onfleet_id],
                status: args[:status],
                driver: self.driver_id,
                location_id: self.location.id)
  end

  def cancel_upcoming
    o_id = self.onfleet_id
    if o_id
      # Try to remove from onfleet: will only be removed if task
      # is not completed
      resp = OnfleetAPI.delete_task(o_id)
      unless resp
        t = Task.where(onfleet_id: o_id).first
        t.update(status: 'cancelled')
        return
      end
    end
    # if nothing was removed from onfleet the set the task to be cancelled
    # since it has not been posted yet
    self.cancel = true
  end
end
