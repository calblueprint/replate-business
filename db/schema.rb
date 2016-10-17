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
    t.string   "number",     null: false
    t.string   "street",     null: false
    t.string   "city",       null: false
    t.string   "country",    null: false
    t.string   "addr_name"
    t.string   "apt_number"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recurrences", force: :cascade do |t|
    t.integer  "day",                        null: false
    t.datetime "start_time",                 null: false
    t.datetime "end_time",                   null: false
    t.integer  "frequency",                  null: false
    t.boolean  "has_sent",   default: false
    t.datetime "start_date",                 null: false
    t.integer  "exception"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "request_id"
  end

  add_index "recurrences", ["request_id"], name: "index_recurrences_on_request_id", using: :btree

  create_table "requests", force: :cascade do |t|
    t.string   "title",       null: false
    t.integer  "food_type",   null: false
    t.string   "caterer",     null: false
    t.text     "comments"
    t.integer  "location_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "requests", ["location_id"], name: "index_requests_on_location_id", using: :btree

  add_foreign_key "recurrences", "requests"
  add_foreign_key "requests", "locations"
end
