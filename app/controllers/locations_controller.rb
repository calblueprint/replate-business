class LocationsController < ApplicationController
	def index
	    @locations = Location.all
	  end

	def show
		respond_with Location.find(params[:id])
	end
end