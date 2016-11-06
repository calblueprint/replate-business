class PickupsController < ApplicationController
    def show
        respond_with Pickup.find(params[:id])
    end
end
