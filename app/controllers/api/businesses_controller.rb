class API::BusinessesController < ApplicationController
  def show
    @business = Business.find(params[:id])
    render json: @business, each_serializer: BusinessSerializer, root: false
  end

  def update
    business = Business.find(params[:id])
  	if business.update business_params
      render_json_message(:ok, message: 'Business successfully updated!')
  	else
      render_json_message(:forbidden)
    end
  end

  def business_params
    params.permit(
      :company_name,
      :phone,
      :address,
      :email
    )
  end
end
