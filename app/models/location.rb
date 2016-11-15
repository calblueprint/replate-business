# == Schema Information
#
# Table name: locations
#
#  id                 :integer          not null, primary key
#  number             :string           not null
#  street             :string           not null
#  city               :string           not null
#  country            :string           not null
#  addr_name          :string
#  apt_number         :string
#  state              :string
#  zip                :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  business_id        :integer
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Location < ActiveRecord::Base
  has_many :pickups
  belongs_to :business
  has_attached_file :photo

  def address
    [self.number, self.street, self.city, self.state, self.zip].join(" ")
  end

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
