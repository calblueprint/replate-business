class API::CancellationsController < ApplicationController
  def create
    cancellation = Cancellation.new(cancellation_params)
    if cancellation.save
      cancellation.recurrence.onfleet_cancel if cancellation.same_day?
      render_json_message(:ok, message: cancellation)
    else
      render_json_message(:forbidden, errors: cancellation.errors.full_messages)
    end
  end

  def destroy
    cancellation = Cancellation.find(params[:id])
      if cancellation.destroy
        render_json_message(:ok, message: 'Cancellation successfully deleted!')
      else
        render_json_message(:forbidden, errors: cancellation.errors.full_messages)
      end
      head 204
  end

  def cancellation_params
    params.require(:cancellation).permit(
      :date,
      :recurrence_id
    )
  end
end
