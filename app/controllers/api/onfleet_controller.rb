class API::OnfleetController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update_task]
  respond_to :json

  def create_webhook
    puts params
    render json: params[:check]
  end

  def update_task
    data = params['data']['task']
    ham = {
      :short_id => data['shortID'] ,\
      :onfleet_id => data['id']
    }
    puts ham
    render json: { message: 'Success' }
  end
end
