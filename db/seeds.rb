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
      phone: "626-215-4676"
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

def make_requests
  1.upto(10) do |n|
    request = Request.create(
      title: "Lunchtime Pickup",
      food_type: 0,
      caterer: "Eat Club",
      comments: "The gate password is 1234.",
      location_id: n
    )

    request.id = n
    request.location = Location.find(n)
    request.save
  end

  1.upto(10) do |n|
    request = Request.create(
      title: "Dinner Pickup",
      food_type: 2,
      caterer: "Zesty",
      comments: "If you arrive after 6pm, enter 12345 on the keypad to enter.",
      location_id: n
    )

    request.id = n + 10
    request.location = Location.find(n)
    request.save
  end
end

make_businesses
make_locations
make_requests
