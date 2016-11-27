class RemoveFoodTypeAndCatererFromPickup < ActiveRecord::Migration
  def change
    remove_column :pickups, :caterer
    remove_column :pickups, :food_type
  end
end
