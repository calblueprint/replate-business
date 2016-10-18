# == Schema Information
#
# Table name: requests
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  food_type   :integer          not null
#  caterer     :string           not null
#  comments    :text
#  location_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Request < ActiveRecord::Base
  belongs_to :location
  has_many :recurrences
  enum food_type: [:raw, :catered, :baked_goods, :packaged]
end
