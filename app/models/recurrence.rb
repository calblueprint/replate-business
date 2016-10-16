# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Recurrence < ActiveRecord::Base
  belongs_to :request
  enum day: [:monday, :tuesday, :wednesday, :thursday, :friday]
end
