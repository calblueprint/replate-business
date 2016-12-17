class PagesController < ApplicationController

  def home
    @companies = ['facebook', 'zerocater', 'yelp', 'doordash', 'linkedin', 'databricks', 'affirm', 'lever', 'eatclub', 'wish', 'xamarin', 'appboy', 'lyft', 'imgur']
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
