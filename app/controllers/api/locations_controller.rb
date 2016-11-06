class API::LocationsController < ApplicationController
  def show
    @location = Location.find(params[:id])
    render json: @location.pickups, root: false
  end
end
