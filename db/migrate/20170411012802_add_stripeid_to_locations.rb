class AddStripeidToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :stripe_customer_id, :string
  end
end
