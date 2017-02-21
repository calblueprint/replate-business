class CreateCancellations < ActiveRecord::Migration
  def change
    create_table :cancellations do |t|
      t.date :date, null: false
      t.references :recurrence, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
