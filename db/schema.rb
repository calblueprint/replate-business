# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161016215940) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string   "number"
    t.string   "street"
    t.string   "city"
    t.string   "country"
    t.string   "addr_name"
    t.string   "apt_number"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recurrences", force: :cascade do |t|
    t.integer  "day"
    t.datetime "starttime"
    t.datetime "endtime"
    t.integer  "frequency"
    t.boolean  "has_sent"
    t.datetime "startdate"
    t.integer  "exception"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.string   "title"
    t.integer  "food_type"
    t.string   "caterer"
    t.text     "comments"
    t.integer  "location_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "requests", ["location_id"], name: "index_requests_on_location_id", using: :btree

  add_foreign_key "requests", "locations"
end
