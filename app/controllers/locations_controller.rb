class LocationsController < ApplicationController
  def show
    @location = Location.find(params[:id])
  end
end
