class EditBusinesses < ActiveRecord::Migration
  def change
  	change_column :businesses, :phone, :string
  	add_column :businesses, :onfleet_id, :string  
  end
end
