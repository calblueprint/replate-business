class AdminsController < ApplicationController

  def home
    if !admin_signed_in?
      redirect_to new_admin_session_path
    end

    @business_ids = business_ids
  end

  def search
    if !admin_signed_in?
      redirect_to new_admin_session_path
    end

  end

  def show
    redirect_to rails_admin_path
  end

  private
  def business_ids
    business_ids = []
    for business in Business.all do
      business_ids << business.id
    end
    return business_ids
  end
end
