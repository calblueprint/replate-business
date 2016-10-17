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

require 'rails_helper'

RSpec.describe Recurrence, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
