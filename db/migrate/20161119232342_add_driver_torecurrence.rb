class AddDriverTorecurrence < ActiveRecord::Migration
  def change
    add_column :recurrences, :driver_id, :string, null: false, default: ''
    add_column :recurrences, :task_id, :string
  end
end
