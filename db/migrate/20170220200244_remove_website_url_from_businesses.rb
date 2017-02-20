class RemoveWebsiteUrlFromBusinesses < ActiveRecord::Migration
  def change
    remove_column :businesses, :website_url
  end
end
