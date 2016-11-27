class ChangeRecurrenceExceptionType < ActiveRecord::Migration
  def change
    remove_column :recurrences, :exception
    add_column :recurrences, :cancel, :boolean, null: false, default: false
  end
end
