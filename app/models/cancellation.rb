class Cancellation < ActiveRecord::Base
  belongs_to :recurrence

  def same_day?
    self.date == Date.today
  end

  def same_day_as?(date)
  	puts date
  	puts self.date
  	puts "---------------------------------"
    self.date == date
  end
end
