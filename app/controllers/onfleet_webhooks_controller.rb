class OnfleetWebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :create]
  def index
    if params['check']
      render :json => params['check']
    else
      redirect_to root_path
    end
  end

  def create
    task_short_id = params['data']['task']['shortId']
    task_completed = Task.find_by(short_id: task_short_id)
    if task_completed
      task_completed.status = 1
      task_completed.description = params['data']['task']['completionDetails']['notes']
      unless task_completed.save
        puts "<------Task: #{task_completed.id} didn't save as completed ----->"
      end
    end
    render :nothing => true
  end

end
