class API::RequestsController < ApplicationController
	respond_to :json

	def create
	    request = Request.new(request_params)
	    if request.save
        render_json_message(:ok, message: 'Request successfully created!')
      else
        render_json_message(:forbidden, errors: request.errors.full_messages)
      end
	end

	def destroy
     	request = Request.find(params[:id])
		if request.destroy
			render_json_message(:ok, message: 'Request successfully deleted!')
		else
			render_json_message(:forbidden, errors: request.errors.full_messages)
		end
		head 204
	end

	def update
		request = Request.find(params[:id])

		if request.update(request_params)
			render_json_message(:ok, message: 'Request successfully updated!')
		else
			render_json_message(:forbidden, errors: request.errors.full_messages)
		end
	end

	private

	def request_params
	  params.require(:request).permit(
	  	:day, 
	  	:start_time, 
	  	:end_time, 
	  	:frequency, 
	  	:has_sent, 
	  	:start_date, 
	  	:exception, 
	  	:location_id
	  	)
	end
end