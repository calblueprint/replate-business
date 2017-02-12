# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
$offices = ["Main Office", "NYC Office", "SF Office"]
NUM_BIZ = 5

def make_businesses
  1.upto(NUM_BIZ) do |n|
    business = Business.create(
      email: "b#{n}@example.com",
      password: "password",
      password_confirmation: "password",
      company_name: Faker::Company.name,
      website_url: Faker::Internet.url,
      phone: '925-222-2342',
      onfleet_id: "siouhasdfo",
    )
    business.id = n
    business.save
  end
end

def make_locations
  1.upto(5) do |n|
    location = Location.create(
      number: "2333",
      street: "Channing Way",
      city: "Berkeley",
      state: "CA",
      zip: "10010",
      country: "USA",
      addr_name: "TEST DO NOT DELIVER"
    )

    location.id = n
    location.business = Business.find(n)
    location.save
  end

  1.upto(5) do |n|
    location = Location.create(
      number: "2333",
      street: "Channing Way",
      city: "Berkeley",
      state: "CA",
      zip: "10010",
      country: "USA",
      addr_name: "TEST DO NOT DELIVER"
    )
    location.id = n + 5
    location.business = Business.find(n)
    location.save
  end
end

def make_pickups
  1.upto(10) do |n|
    pickup = Pickup.create(
      title: "Lunchtime Pickup",
      comments: Faker::Lorem.sentence,
      location_id: n
    )

    pickup.id = n
    pickup.location = Location.find(n)
    pickup.save
  end

  1.upto(10) do |n|
    pickup = Pickup.create(
      title: "Dinner Pickup",
      comments: "If you arrive after 6pm, enter 12345 on the keypad to enter.",
      location_id: n
    )

    pickup.id = n + 10
    pickup.location = Location.find(n)
    pickup.save
  end
end

def randomtime
  start_time = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"].sample
  end_time = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].sample
  [start_time, end_time]
end

def make_recurrences
  pickups = Pickup.all
  pickups.each do |pickup|
    1.upto(4) do |n|
      pickup.recurrences.create(
        day: n,
        frequency: 1,
        start_date: Time.new(2017, 1, 01),
        start_time: randomtime[0],
        end_time: randomtime[1],
        pickup_id: pickup.id,
        #(this is helen's driver id)
        driver_id: 'nhed6lRTknGd~IgCOD4MjWNK'
      )
    end
  end
end

make_businesses
make_locations
# make_pickups
# make_recurrences
