class API::BusinessesController < ApplicationController
  def show
    @business = Businesses.find(params[:id])
    render json: @business.locations, root: false
  end
end
