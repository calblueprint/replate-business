class Cancellation < ActiveRecord::Base
  belongs_to :recurrence

  def same_day?
    self.date == Date.today
  end

  def same_day_as?(date)
    self.date == date
  end
end
