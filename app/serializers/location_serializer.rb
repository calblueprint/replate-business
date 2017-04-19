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

class LocationSerializer < ActiveModel::Serializer
  attributes :id,
             :url,
             :number,
             :street,
             :city,
             :country,
             :addr_name,
             :state,
             :zip,
             :email,
             :stripe_customer_id

  has_many :pickups

  def url
    object.photo.url
  end

end
