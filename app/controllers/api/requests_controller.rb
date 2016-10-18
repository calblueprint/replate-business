class API::RequestsController < ApplicationController
	respond_to :json

	def show
		respond_with Request.find(params[:id])
	end

	def create
	    request = Request.new(request_params)
	    if request.save
	      render json: request, status: 201, location: [:api, request]
	    else
	      render json: { errors: request.errors.full_messages }, status: 422
	    end
	end

	def destroy
     	request = Request.find(params[:id])
		if request.destroy
			render_json_message(:ok, message: 'Student successfully deleted!')
		else
			render_json_message(:forbidden, errors: request.errors.full_messages)
		end
		head 204
	end

	def update
		request = Request.find(params[:id])

		if request.update(request_params)
			render json: request, status: 200, location: [:api, request]
		else
			render json: { errors: request.errors }, status: 422
		end
	end

	private

	def request_params
	  params.require(:request).permit(:day, :start_time, :end_time, :frequency, :has_sent, :start_date, 
	  								  :exception, :created_at, :updated_at, :request_id)
	end
end