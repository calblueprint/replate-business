class AddPaidToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :paid, :boolean, null: false, :default => false
  end
end
