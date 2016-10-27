class API::LocationsController < ApplicationController
  def show
    @location = Location.find(params[:id])
    render json: @location.requests, root: false
  end
end
