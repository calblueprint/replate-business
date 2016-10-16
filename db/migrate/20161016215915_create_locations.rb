class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :number
      t.string :street
      t.string :city
      t.string :country
      t.string :addr_name
      t.string :apt_number
      t.string :state
      t.string :zip
      t.timestamps null: false
    end
  end
end
