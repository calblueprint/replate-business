class API::SessionsController < ApplicationController
  def create
    puts "hello"
    puts params
    @business = Business.find_by_email(params[:email]) 
    if @business.valid_password? params[:password]
      sign_in(:business, @business) 
      render_json_message(:ok, message: 'Successfully signed in')
    else
      render_json_message(:forbidden, errors: @business.errors.full_messages)
    end
    
  end
end