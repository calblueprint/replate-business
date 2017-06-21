require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Replate
  class Application < Rails::Application

    # Configure Paperclip upload gem
    config.paperclip_defaults = {
      :storage => :s3,
      :s3_region => ENV['AWS_REGION'],
      :s3_credentials => {
        :bucket => ENV['S3_BUCKET_NAME'],
        :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
        :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
      }
    }

    # for the onfleet module
    config.autoload_paths += %W(#{config.root}/lib)

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # Enable React addons
    config.react.addons = true


    # Enable experimental features for Babel
    config.react.jsx_transform_options = {
      stage: 0
    }
  end
end
