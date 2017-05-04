class ChangeTaskShortIdToNotNull < ActiveRecord::Migration
  def change
    change_column :tasks, :short_id, :string, null: false
  end
end

