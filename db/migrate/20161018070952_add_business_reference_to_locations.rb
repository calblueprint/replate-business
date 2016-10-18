class AddBusinessReferenceToLocations < ActiveRecord::Migration
  def change
    add_reference :locations, :business, index: true, foreign_key: true
  end
end
