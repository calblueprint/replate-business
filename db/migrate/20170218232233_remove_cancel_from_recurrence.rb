class RemoveCancelFromRecurrence < ActiveRecord::Migration
  def change
    remove_column :recurrences, :cancel
  end
end
