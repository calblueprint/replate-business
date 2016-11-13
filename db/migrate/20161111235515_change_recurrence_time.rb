class ChangeRecurrenceTime < ActiveRecord::Migration
  def change
    remove_column :recurrences, :start_time
    remove_column :recurrences, :end_time
    add_column :recurrences, :start_time, :string
    add_column :recurrences, :end_time, :string
  end
end
