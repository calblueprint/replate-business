class API::LocationsController < ApplicationController
  respond_to :json

  def show
    puts "\n \n <<<<<<<<<<>>>>>>>>>>> \n \n"
    @location = Location.find(params[:id])
    render json: @location, each_serializer: LocationSerializer, root: false
  end

  def create
    location = Location.new(location_params)
      if location.save
        render_json_message(:ok, message: 'Location successfully created!')
      else
        render_json_message(:forbidden, errors: location.errors.full_messages)
      end
  end

  def destroy
    location = Location.find(params[:id])
		if location.destroy
		  render_json_message(:ok, message: 'Location successfully deleted!')
		else
			render_json_message(:forbidden, errors: location.errors.full_messages)
		end
		head 204
	end

  def update
    begin 
  		location = Location.find(params[:id])
      a = location.update(location_params)
    rescue
      render_json_message(:forbidden)
      return;
    end
		if a
	    render_json_message(:ok, message: 'Request successfully updated!')
		else
			render_json_message(:forbidden, errors: location.errors.full_messages)
		end
	end

  def this_week
    location = Location.find(params[:id])
    pickups = location.this_week(params[:today])
    render json: pickups, root: false
  end

  def get_tasks
    location = Location.find(params[:id])
    tasks    = location.tasks
    render json: tasks, root: false
  end

  def location_params
    params.permit(
      :addr_name,
      :number,
      :street,
      :city,
      :country,
      :state,
      :zip,
      :business_id,
      :photo,
      :lat,
      :lon,
      :email
    )

  end

  private

end
