class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  	def render_json_message(status, options = {})
		render json: {
		  data: options[:data],
		  message: options[:message],
		  to: options[:to],
		  errors: options[:errors]
		}, status: status
	end

	def after_sign_in_path_for(resource)
		if resource.is_a?(Business)
      		dashboard_path
		end
	end
end
