class API::BusinessesController < ApplicationController
  def show
    @business = Business.find(params[:id])
    render json: @business, each_serializer: BusinessSerializer, root: false
  end
end
