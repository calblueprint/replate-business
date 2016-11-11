class RegistrationsController < Devise::RegistrationsController

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
end