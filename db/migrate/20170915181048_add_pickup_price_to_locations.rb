class AddPickupPriceToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :pickup_price, :integer,null: false, default: 30
  end
end
