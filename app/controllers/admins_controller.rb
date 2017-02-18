class AdminsController < ApplicationController
  def home
    if !admin_signed_in?
      redirect_to root_path
    end
    
  end
end
