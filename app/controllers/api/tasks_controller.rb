class API::TasksController < ApplicationController
  respond_to :json
  def create
    task = Task.create(task_params)
    if task.save
      render_json_message(:ok, message: 'Task successfully created!')
    else
      render_json_message(:forbidden, errors: task.errors.full_messages)
    end
  end

  def show
    @task = Task.find(params[:id])
    render json: @task, root: false
  end


  def update
    task = Task.find(params[:id])
    if business.update business_params
      render_json_message(:ok, message: 'Task successfully updated!')
    else
      render_json_message(:forbidden, errors: task.errors.full_messages)
    end
  end


  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render_json_message(:ok, message: 'Task successfully deleted!')
    else
      render_json_message(:forbidden, errors: task.errors.full_messages)
    end
  end


  def task_params
    params.permit(
      :scheduled_date,
      :status,
      :driver,
      :location_id,
      :description,
      :trays_donateds
      )
  end
end

