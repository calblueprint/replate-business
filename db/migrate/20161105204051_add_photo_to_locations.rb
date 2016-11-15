class AddPhotoToLocations < ActiveRecord::Migration
  def self.up
    add_attachment :locations, :photo
  end

  def self.down
    remove_attachment :locations, :photo
  end
end
