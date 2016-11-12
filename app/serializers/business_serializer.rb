class BusinessSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :company_name,
             :phone

  has_many :locations, serializer: LocationSerializer
end
