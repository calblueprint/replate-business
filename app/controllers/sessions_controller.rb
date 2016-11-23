class SessionsController < Devise::SessionsController
	def create
		auth_options = { :recall => 'businesses#home', :scope => :business}
		self.resource = warden.authenticate!(auth_options)
	  set_flash_message!(:notice, :signed_in)
	  sign_in(resource_name, resource)
	  yield resource if block_given?
	  respond_with resource, location: after_sign_in_path_for(resource)
	end
end