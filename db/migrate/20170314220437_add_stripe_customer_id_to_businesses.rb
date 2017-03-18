class AddStripeCustomerIdToBusinesses < ActiveRecord::Migration
  def change
  	add_column :businesses, :stripe_customer_id, :string
  end
end
