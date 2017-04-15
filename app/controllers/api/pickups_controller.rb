class API::PickupsController < ApplicationController
	respond_to :json

	def show
		@pickup = Pickup.find(params[:id])
		render json: {:pickup => @pickup,
		              :recurrences => @pickup.recurrences}, root: false
	end

	def create
	    pickup = Pickup.new(pickup_params)
	    if pickup.save
	      render_json_message(:ok, message: pickup)
	    else
	      render_json_message(:forbidden, errors: pickup.errors.full_messages)
	    end
	end

	def destroy
	   	pickup = Pickup.find(params[:id])
		if pickup.destroy
			render_json_message(:ok, message: 'Pickup successfully deleted!')
		else
			render_json_message(:forbidden, errors: pickup.errors.full_messages)
		end
		head 204
	end

	def update
		pickup = Pickup.find(params[:id])

		if pickup.update(pickup_params)
			render_json_message(:ok, message: 'Pickup successfully updated!')
		else
			render_json_message(:forbidden, errors: pickup.errors.full_messages)
		end
	end

	private

	def pickup_params
	  params.require(:pickup).permit(
	  	:title,
	  	:comments,
	  	:location_id
	  	)
	end
end
