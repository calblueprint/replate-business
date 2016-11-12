class DashboardLocationSerializer < ActiveModel::Serializer
  attributes :id,
             :url,
             :number,
             :street,
             :city,
             :country,
             :addr_name,
             :state,
             :zip

  def url
    object.photo.url
  end

end
