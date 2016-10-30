class BusinessesController < ApplicationController
  

  def home
    @business = current_business
  end

  def index
    
  end

  
end