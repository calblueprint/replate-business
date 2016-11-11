class API::BusinessesController < ApplicationController
  def show
    @locations = Location.where("business_id =?", params[:id])
    render json: @locations, each_serializer: LocationSerializer
  end
end
