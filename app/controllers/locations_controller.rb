class LocationsController < ApplicationController
  load_and_authorize_resource

  def index
    @locations = Location.all
  end

  def show
    @location = Location.find(params[:id])
  end
end
