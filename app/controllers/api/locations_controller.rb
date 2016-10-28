class API::LocationsController < ApplicationController
  def show
    @location = Location.find(params[:id])
    render json: @location.requests, root: false
  end

  def create
  ##### TODO: create a new location. Remember to use location params! hint: look at api/requests_controller ######
  end

  def location_params
  ##### TODO: permit the fields allowed when building a new location ######
    params.require(:location).permit()
  end
end
