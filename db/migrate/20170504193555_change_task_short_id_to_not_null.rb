class ChangeTaskShortIdToNotNull < ActiveRecord::Migration
  def change
    change_column :tasks, :short_id, :string, null: false, default: nil
  end
end

