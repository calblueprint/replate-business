class API::BusinessesController < ApplicationController
  def show
    @business = Business.find(params[:id])
    render json: @business.locations, root: false
  end
end
