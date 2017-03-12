class BusinessesController < ApplicationController

  def home
    if !business_signed_in?
      redirect_to root_path
    end

    @business = current_business

  end

  def show
    @business = Business.find(params[:id])

  end
end
