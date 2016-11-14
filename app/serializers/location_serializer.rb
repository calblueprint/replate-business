class LocationSerializer < ActiveModel::Serializer
  attributes :id,
             :url,
             :number,
             :street,
             :city,
             :country,
             :addr_name,
             :state,
             :zip

  has_many :pickups

  def url
    object.photo.url
  end

end
