class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :number, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :country, null: false
      t.string :addr_name
      t.string :apt_number
      t.string :state
      t.string :zip
      t.timestamps null: false
    end
  end
end
