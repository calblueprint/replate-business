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

ActiveRecord::Schema.define(version: 20170220200244) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "businesses", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "company_name"
    t.string   "phone"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "onfleet_id"
  end

  add_index "businesses", ["email"], name: "index_businesses_on_email", unique: true, using: :btree
  add_index "businesses", ["reset_password_token"], name: "index_businesses_on_reset_password_token", unique: true, using: :btree

  create_table "cancellations", force: :cascade do |t|
    t.date     "date",          null: false
    t.integer  "recurrence_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "cancellations", ["recurrence_id"], name: "index_cancellations_on_recurrence_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.string   "number",             null: false
    t.string   "street",             null: false
    t.string   "city",               null: false
    t.string   "country",            null: false
    t.string   "addr_name"
    t.string   "apt_number"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "business_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "locations", ["business_id"], name: "index_locations_on_business_id", using: :btree

  create_table "pickups", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "comments"
    t.integer  "location_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "pickups", ["location_id"], name: "index_pickups_on_location_id", using: :btree

  create_table "recurrences", force: :cascade do |t|
    t.integer  "day",                        null: false
    t.integer  "frequency",                  null: false
    t.boolean  "has_sent",   default: false
    t.datetime "start_date",                 null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "pickup_id"
    t.string   "start_time"
    t.string   "end_time"
    t.string   "driver_id",  default: "",    null: false
    t.string   "onfleet_id"
  end

  add_index "recurrences", ["pickup_id"], name: "index_recurrences_on_pickup_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.datetime "scheduled_date", null: false
    t.string   "onfleet_id"
    t.integer  "status",         null: false
    t.integer  "driver",         null: false
    t.integer  "location_id",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "tasks", ["location_id"], name: "index_tasks_on_location_id", using: :btree
  add_index "tasks", ["onfleet_id"], name: "index_tasks_on_onfleet_id", using: :btree

  add_foreign_key "cancellations", "recurrences"
  add_foreign_key "locations", "businesses"
  add_foreign_key "pickups", "locations"
  add_foreign_key "recurrences", "pickups"
  add_foreign_key "tasks", "locations"
end
