# == Schema Information
#
# Table name: locations
#
#  id                 :integer          not null, primary key
#  number             :string           not null
#  street             :string           not null
#  city               :string           not null
#  country            :string           not null
#  addr_name          :string
#  apt_number         :string
#  state              :string
#  zip                :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  business_id        :integer
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Location < ActiveRecord::Base
  has_many :pickups, :dependent => :destroy
  has_many :tasks, :dependent => :destroy
  belongs_to :business
  has_attached_file :photo

  def address
    [self.number, self.street, self.city, self.state, self.zip].join(" ")
  end

  def line1
    [self.number, self.street].join(" ")
  end

  def line2
    self.apt_number
  end

  def this_week(today)
  	pickups = {}
  	self.pickups.each do |pickup|
  		pickup.recurrences.each do |r|
  			if r.same_week(today)
  				if pickups[r.day]
  					pickups[r.day].push([pickup, r])
  				else
  					pickups[r.day] = [[pickup,r]]
  				end
  			end
  		end
  	end
  	return pickups
  end

  def get_tasks
    tsks = {}
    count = 0
    if not self.tasks.empty?
      puts "hi"
      self.tasks.each do |task|
        tsks[count] = task
        count = count + 1
      end
    end
    puts "runnin"
    return tsks
  end

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
