# == Schema Information
#
# Table name: requests
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  comments    :text
#  location_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Pickup < ActiveRecord::Base
  belongs_to :location
  has_many :recurrences
end
