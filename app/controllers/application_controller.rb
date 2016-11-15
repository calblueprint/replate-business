class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_ability
    @current_ability ||= Ability.new(current_business)
  end

  rescue_from CanCan::AccessDenied do
    if current_business
      redirect_to dashboard_path
    else
      redirect_to root_path
    end
  end

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
>>>>>>> 4ebcc770612a8b65a24d6103d8811fe4d2f6e74a
end
