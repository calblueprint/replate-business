# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  scheduled_date :datetime         not null
#  onfleet_id     :string
#  status         :integer          not null
#  driver         :integer          not null
#  location_id    :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'

# RSpec.describe Task, type: :model do
#   pending "add some examples to (or delete) #{__FILE__}"
# end
