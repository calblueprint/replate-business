class CreatePickups < ActiveRecord::Migration
  def change
    create_table :pickups do |t|
      t.string :title, null: false
      t.integer :food_type, null: false
      t.string :caterer, null: false
      t.text :comments
      t.references :location, index: true, foreign_key: true, null: false
      t.timestamps null: false
    end
  end
end
