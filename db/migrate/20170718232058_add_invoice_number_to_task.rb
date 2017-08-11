class AddInvoiceNumberToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :invoice_number, :integer
  end
end
