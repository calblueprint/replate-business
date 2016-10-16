class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.string :title
      t.integer :food_type
      t.string :caterer
      t.text :comments
      t.references :location, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
