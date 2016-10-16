# == Schema Information
#
# Table name: recurrences
#
#  id         :integer          not null, primary key
#  day        :integer
#  starttime  :datetime
#  endtime    :datetime
#  frequency  :integer
#  has_sent   :boolean
#  startdate  :datetime
#  exception  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Recurrence, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
