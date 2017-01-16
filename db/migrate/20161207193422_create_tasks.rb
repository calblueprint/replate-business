class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.datetime :scheduled_date, null: false
      t.string :onfleet_id, index: true
      t.integer :status, null: false
      t.integer :driver, null: false
      t.references :location, foreign_key: true, index: true, null: false
      t.timestamps null: false
    end
  end
end
