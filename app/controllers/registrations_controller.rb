class RegistrationsController < Devise::RegistrationsController

  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.save
      sign_in(resource_name, resource)
      render_json_message(:ok, message: 'Account created!', to:
                          redirect_user_path(resource))
    else
      render_json_message(:forbidden, errors: resource.errors.full_messages)
    end
  end

  private

  def sign_up_params
    params.require(:business).permit(
    	:company_name,
    	:address,
    	:phone,
    	:email,
    	:password,
    	:password_confirmation,
    )
  end

  def account_update_params
    params.require(:business).permit(
    	:company_name,
    	:address,
    	:phone,
    	:email,
    	:password,
    	:password_confirmation,
    	:current_password,
    )
  end

  def after_update_path_for(resource)
    if resource.is_a?(Business)
      dashboard_path
    end
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
end
