class AddDescriptionToCreateTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :description, :text
    add_column :tasks, :trays_donated, :integer
  end
end
