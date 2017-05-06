class API::OnfleetController < ApplicationController
  protect_from_forgery with: :null_session

  def update_task
    if params[:check].nil?
      # this is data
      puts params
      onfleet_id = params[:taskId]
      short_id = params[:shortId]
    else
      # this is instantiating a new webhook
      render json: params[:check]
    end
  end
end
