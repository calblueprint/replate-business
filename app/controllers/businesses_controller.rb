class BusinessesController < ApplicationController

  def home
    if !business_signed_in?
      redirect_to root_path
    end
    puts current_business
    @business = current_business
  end
end
