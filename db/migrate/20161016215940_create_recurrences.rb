class CreateRecurrences < ActiveRecord::Migration
  def change
    create_table :recurrences do |t|
      t.integer :day, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.integer :frequency, null: false
      t.boolean :has_sent, default: false
      t.datetime :start_date, null: false
      t.integer :exception, null: false, default: 0
      t.timestamps null: false
      t.references :pickup, index: true, foreign_key: true
    end
  end
end
