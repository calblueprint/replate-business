class AddIndexToEmail < ActiveRecord::Migration
  def change
    change_table :locations do |t|
      t.index :email, unique: true
    end
  end
end
