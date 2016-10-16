# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  number     :string
#  street     :string
#  city       :string
#  country    :string
#  addr_name  :string
#  apt_number :string
#  state      :string
#  zip        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Location, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
