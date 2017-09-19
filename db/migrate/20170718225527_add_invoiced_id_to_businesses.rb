class AddInvoicedIdToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :invoiced_id, :integer
  end
end
