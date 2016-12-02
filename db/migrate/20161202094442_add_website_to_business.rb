class AddWebsiteToBusiness < ActiveRecord::Migration
  def change
    add_column :businesses, :website_url, :string
  end
end
