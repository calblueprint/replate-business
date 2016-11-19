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

  def self.post_batch_task(day)
    recurrences = Recurrence.where(day: 1)
    s = []
    f = []
    recurrences.each do |r|
      if r.cancel
        r.update(cancel: false)
        next
      else
        resp = OnfleetAPI.post_task(r)
      end
      if resp.key?('id')
        s << {:success => r, :id => resp['id']}
      else
        puts '#{r.id} #{resp["message"]}'
        f << {:failed => r, :message => resp["message"]}
      end
      sleep 0.2
    end
    { succes: s, failure: f }
  end

  def self.post_daily_task
    today = Time.now.wday - 1
    post_batch_task(today)
  end
end
