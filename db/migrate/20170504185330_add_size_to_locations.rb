class AddSizeToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :is_large, :boolean
  end
end
