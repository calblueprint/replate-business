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

ActiveRecord::Schema.define(version: 20161017194021) do

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
    t.string   "address"
    t.string   "company_name"
    t.integer  "phone"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "businesses", ["email"], name: "index_businesses_on_email", unique: true, using: :btree
  add_index "businesses", ["reset_password_token"], name: "index_businesses_on_reset_password_token", unique: true, using: :btree

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
    t.integer  "exception",  default: 0,     null: false
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
