class BusinessesController < ApplicationController
  

  def home
    @business = current_business
  end

  def index
    if business_signed_in?
      #do something
    end

  end
end