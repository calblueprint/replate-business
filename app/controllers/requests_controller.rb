class RequestsController < ApplicationController
	respond_to :json

	def show
		respond_with Request.find(params[:id])
	end
end