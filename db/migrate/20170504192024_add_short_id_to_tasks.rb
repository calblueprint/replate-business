class AddShortIdToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :short_id, :string, default: nil
  end
end
