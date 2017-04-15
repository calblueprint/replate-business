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
      render_json_message(:forbidden, errors: business.errors.full_messages)
    end
  end

  def index
    @businesses = Business.order("LOWER(company_name)")
    render json: @businesses, each_serializer: BusinessSerializer, root: false
  end

  def business_params
    params.permit(
      :company_name,
      :website_url,
      :phone,
      :email
    )
  end
end
