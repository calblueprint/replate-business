class PagesController < ApplicationController

  def home
    @companies = ['facebook', 'zerocater', 'yelp', 'doordash', 'linkedin', 'databricks', 'affirm', 'lever', 'eatclub', 'wish', 'xamarin', 'appboy', 'lyft', 'imgur']
  end

  def business
  end

  def style
  end

  def terms
    filename = "#{Rails.root}/public/privacy.md"
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

    @text = markdown.render(File.read(filename)).html_safe
  end
end
