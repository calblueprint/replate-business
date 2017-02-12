class AddOnfleetIdColumnToRecurrences < ActiveRecord::Migration
  def change
    add_column :recurrences, :onfleet_id, :string
  end
end
