# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def make_businesses
  1.upto(5) do |n|
    business = Business.create(
      email: "b#{n}@example.com",
      password: "password",
      password_confirmation: "password",
      address: "1 Hacker Way, Menlo Park, CA",
      company_name: "Facebook",
      phone: "626-215-4676",
      onfleet_id: "siouhasdfo",
    )
    business.id = n
    business.save
  end
end

def make_locations
  1.upto(5) do |n|
    location = Location.create(
      number: "140",
      street: "New Montgomery Street",
      city: "San Francisco",
      state: "CA",
      zip: "94025",
      country: "USA",
      addr_name: "Facebook HQ",
    )

    location.id = n
    location.business = Business.find(n)
    location.save
  end

  1.upto(5) do |n|
    location = Location.create(
      number: "28",
      street: "West 25th Street",
      city: "New York",
      state: "NY",
      zip: "10010",
      country: "USA",
      addr_name: "NYC Office",
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
      food_type: 0,
      caterer: "Eat Club",
      comments: "The gate password is 1234.",
      location_id: n
    )

    pickup.id = n
    pickup.location = Location.find(n)
    pickup.save
  end

  1.upto(10) do |n|
    pickup = Pickup.create(
      title: "Dinner Pickup",
      food_type: 2,
      caterer: "Zesty",
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
    1.upto(3) do |n|
      pickup.recurrences.create(
        day: n,
        frequency: 1,
        start_date: Time.now,
        start_time: randomtime[0],
        end_time: randomtime[1],
        #(this is carlos)
        driver_id: 'XQFOAulEVucASO3PVZLGRwrN'
      )
    end
  end
end

make_businesses
make_locations
make_pickups
make_recurrences
