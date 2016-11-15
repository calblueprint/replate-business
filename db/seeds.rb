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
      number: "1",
      street: "Hacker Way",
      city: "Menlo Park",
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
      number: "770",
      street: "Broadway",
      city: "New York",
      state: "NY",
      zip: "10003",
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
  times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",\
                 "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
  start_time = rand(0..7)
  end_time = start_time + 1
  {:start_time => times[start_time], :end_time => times[end_time]}
end

def make_recurrences
  pickups = Pickup.all
  pickups.each do |pickup|
    1.upto(3) do |n|
      pickup.recurrences.create(
        day: n,
        frequency: 1,
        start_date: Time.now,
        start_time: randomtime[:start_time],
        end_time: randomtime[:end_time],
      )
    end
  end
end

make_businesses
make_locations
make_pickups
make_recurrences
