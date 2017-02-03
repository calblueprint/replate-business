class API::SessionsController < ApplicationController
  def create
    @business = Business.find_by_email(params[:email])
    if @business and @business.valid_password? params[:password]
      sign_in(:business, @business) 
      render_json_message(:ok, message: 'Successfully signed in')
    else
      render_json_message(:forbidden, errors: 'There has been an error with your request')
    end
    
  end
end