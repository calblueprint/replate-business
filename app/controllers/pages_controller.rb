class PagesController < ApplicationController

  def home
    @companies = ['facebook', 'zerocater', 'yelp', 'doordash', 'yahoo', 'linkedin', 'twitch', 'affirm', 'lever', 'cal', 'eatclub', 'tumblr', 'lyft', 'imgur', 'aramark']
    @recipients = ['arriba-juntos', 'bowery-mission', 'city-team', 'ecap', 'ecumenical-hunger-program', 'larkin-street', 'life-moves', 'new-york-city-rescue-mission', 'project-homeless-connect', 'recovery-cafe', 'saint-pauls-house', 'samaritan-house', 'society-of-saint-vincent-de-paul']
  end

  def business
  end

  def style
  end

  def terms
    termsFile = "#{Rails.root}/public/tos.md"
    privacyFile = "#{Rails.root}/public/privacy.md"
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

    @terms = markdown.render(File.read(termsFile)).html_safe
    @privacy = markdown.render(File.read(privacyFile)).html_safe
  end
end
