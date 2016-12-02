class RemoveAddressFromBusiness < ActiveRecord::Migration
  def change
    remove_column :businesses, :address, :string
  end
end
