class RemoveTaskIdColumn < ActiveRecord::Migration
  def change
    remove_column :recurrences, :task_id
  end
end
