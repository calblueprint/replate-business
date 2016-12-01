class API::RecurrencesController < ApplicationController
    respond_to :json

    def show
        @recurrence = Recurrence.find(params[:id])
        render json: @recurrence, root: false
    end

    def create
        recurrence = Recurrence.new(recurrence_params)
        if recurrence.save
          render_json_message(:ok, message: recurrence)
        else
          render_json_message(:forbidden, errors: recurrence.errors.full_messages)
        end
    end

    def destroy
        recurrence = Recurrence.find(params[:id])

        if recurrence.destroy
            render_json_message(:ok, message: 'Recurrence successfully deleted!')
        else
            render_json_message(:forbidden, errors: recurrence.errors.full_messages)
        end
        head 204
    end

    def update
        recurrence = Recurrence.find(params[:id])

        if recurrence.update(recurrence_params)
            render_json_message(:ok, message: 'Recurrence successfully updated!')
        else
            render_json_message(:forbidden, errors: recurrence.errors.full_messages)
        end
    end

    private

    def recurrence_params
      params.require(:recurrence).permit(
        :day,
        :start_time,
        :end_time,
        :frequency,
        :start_date,
        :request_id,
    )
    end
end
