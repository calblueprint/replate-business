
class AdminsController < ApplicationController

  def show
    if !admin_signed_in?
      redirect_to root_path
    end
    @business_ids = business_ids
  end

  private
  def business_ids
    business_ids =[]
    for business in Business.all do
      business_ids << business.id
    end
    return business_ids
  end
end
