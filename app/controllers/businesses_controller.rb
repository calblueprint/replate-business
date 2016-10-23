class BusinessesController < ApplicationController
  before_action :authenticate_business!

  def home
    @business = current_business
  end
end
