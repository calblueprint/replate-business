class RequestsController < ApplicationController
    def show
        respond_with Request.find(params[:id])
    end
end
