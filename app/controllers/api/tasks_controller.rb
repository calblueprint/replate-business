class API::TasksController < ApplicationController
  respond_to :json

  def show
    respond_with Task.find(params[:id])
  end
end