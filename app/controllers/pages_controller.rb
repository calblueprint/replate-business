class PagesController < ApplicationController
  def home
    @companies = ['facebook', 'zerocater', 'yelp', 'doordash', 'linkedin', 'databricks', 'affirm', 'lever', 'eatclub', 'wish', 'xamarin', 'appboy', 'lyft', 'imgur']
  end

  def business
  end

  def style
  end
end
