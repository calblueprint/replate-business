class CreateRecurrences < ActiveRecord::Migration
  def change
    create_table :recurrences do |t|
      t.integer :day
      t.datetime :starttime
      t.datetime :endtime
      t.integer :frequency
      t.boolean :has_sent
      t.datetime :startdate
      t.integer :exception
      t.timestamps null: false
      t.references :request, index: true, foreign_key: true
    end
  end
end
