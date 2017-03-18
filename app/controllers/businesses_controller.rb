class BusinessesController < ApplicationController

  def home
    if !business_signed_in?
    	if admin_signed_in?
    		redirect_to admin_dashboard_path
    	else
	      redirect_to root_path
	    end
    end

    @business = current_business
  end

  def show
    @business = Business.find(params[:id])
  end
end
