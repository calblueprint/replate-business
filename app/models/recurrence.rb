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
  has_many :cancellations, :dependent => :destroy
  enum frequency: [:one_time, :weekly]
  enum day: [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  before_destroy :onfleet_cancel

  def location
    self.pickup.location
  end

  def start_day
    Date.new(self.start_date.year, self.start_date.month, self.start_date.day)
  end

  def business
    self.pickup.location.business
  end

  def deliver_today?(date = Date.today, day = Time.now.wday)
    r_date = DateTime.new(self.start_date.year, self.start_date.month, self.start_date.day)
    r_date == date and Recurrence.days()[self.day] == day
  end

  def post_on_demand
    OnfleetAPI.post_single_task(self, Date.today)
    args = {:date => Date.today, :tasks =>[self]}
    ExportAllRecurrences.new(args).export_on_demand_task
  end

  # Notifies Replate if a pickup is cancelled. Only called if the pickup is the current day
  def cancel_notification
    if self.deliver_today?
      self.onfleet_cancel
    end
  end

  # Temporary assignment method since no load balancing drivers yet
  def assign_driver
    # if self.location.state == 'California'
    #   self.driver_id = 'Wxi7dpU3VBVSQoEnG3CgMRjG'
    # else
    #   self.driver_id = 'rgU76yPZh2Qbo~ZYIsosqEUn'
    # end
    self.driver_id = '4zeEx71*c6skdFCtr0aNyh1Y'
  end

  def self.get_date_after(date, day)
    puts day.to_date
    return date if date.wday == day.to_date.wday
    days_difference = (date - day.to_date).to_i
    result = day.to_date + days_difference + (day.to_date.wday - date.wday)
    result = result + 1.week if result.to_date < date
    return result
  end

  def same_week(reference)
    reference = Date.parse(reference)
    start_date = self.start_date.to_date

    same_week = start_date.strftime('%U') == reference.strftime('%U')
    same_year = start_date.strftime('%Y') == reference.strftime('%Y')
    if self.frequency === "one_time" and same_week and same_year
      return true
    end

    Date.beginning_of_week = :sunday
    recurrence_date = Recurrence.get_date_after(reference.beginning_of_week, self.day)
    if (same_week and same_year) or reference >= start_date
      self.cancellations.each do |cancellation|
        if cancellation.same_day_as? recurrence_date
          return false
        end
      end
    end

    today = Date.today
    first_recurrence_date = Recurrence.get_date_after(start_date, self.day)
    same_week = first_recurrence_date.strftime('%U') == reference.strftime('%U')
    first_before_today = first_recurrence_date.beginning_of_day < today.beginning_of_day
    first_before_reference = first_recurrence_date.beginning_of_day < reference.beginning_of_day

    if self.frequency === "weekly"
      if same_week
        return (not first_before_today)
      elsif not first_before_reference
        return false
      end
      return true
    end

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

  def onfleet_cancel
    if self.deliver_today?
      MaenMailer.export_cancellation(self, Date.today).deliver_now
    end
    o_id = self.onfleet_id
    if o_id
      # Try to remove from onfleet: will only be removed if task
      # is not completed
      resp = OnfleetAPI.delete_task(o_id)
      unless resp
        t = Task.where(onfleet_id: o_id).first
        t.update(status: 'cancelled') if task
        return
      end
    end
  end

  def onfleet_update
    if self.deliver_today?
      MaenMailer.onfleet_update(self, Date.today).deliver_now
    end
    o_id = self.onfleet_id
    if o_id
      resp = OnfleetAPI.update_single_task(self, Date.today, o_id)
    end
  end
end
