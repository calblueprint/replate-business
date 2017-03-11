class AddLatLonsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :lat, :float
    add_column :locations, :lon, :float
  end
end
