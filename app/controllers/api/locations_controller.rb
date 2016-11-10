class API::LocationsController < ApplicationController
  respond_to :json

  def show
    @location = Location.find(params[:id])
    render json: @location.pickups, root: false
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
		location = Location.find(params[:id])
		if location.update(location_params)
	    render_json_message(:ok, message: 'Request successfully updated!')
		else
			render_json_message(:forbidden, errors: locations.errors.full_messages)
		end
	end

  def location_params
  ##### TODO: permit the fields allowed when building a new location ######
    params.permit(
    :addr_name,
    :number,
    :street,
    :city,
    :country,
    :state,
    :zip,
    :business_id,
    :photo
    )

  end

  private

end
