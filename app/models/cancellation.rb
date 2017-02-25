class Cancellation < ActiveRecord::Base
  belongs_to :recurrence

  def same_day?
    self.date == Date.today
  end
end
