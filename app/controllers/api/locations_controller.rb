class API::LocationsController < ApplicationController
  respond_to :json

  def show
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
		location = Location.find(params[:id])
		if location.update(location_params)
	    render_json_message(:ok, message: 'Request successfully updated!')
		else
			render_json_message(:forbidden, errors: locations.errors.full_messages)
		end
	end

  def this_week
    location = Location.find(params[:id])
    pickups = location.this_week(params[:today])
    render json: pickups, root: false
  end

  def find_tasks
    location = Location.find(params[:id])
    currenttasks = location.get_tasks
    render json: currenttasks, root: false
  end

  def mark_tasks_paid
    location = Location.find(params[:id])
    Task.where(:location_id => location.id).update_all(paid: true)
    render_json_message(:ok, message: 'Tasks marked as paid!')
  end

  def charge
    location = Location.find(params[:id])
    puts Figaro.env.stripe_api_key
    Stripe.api_key = Figaro.env.stripe_api_key
    useSaved = params[:useSaved]
    amount = params[:chargeAmount]
    if location.stripe_customer_id != nil and useSaved
      puts "using saved"
      charge = Stripe::Charge.create(
      :amount => amount * 100, # $15.00 this time
      :currency => "usd",
      :customer => location.stripe_customer_id, # Previously stored, then retrieved
      )
      render :json => {}
    else
      store = params[:store]
      token = params[:stripeToken]
      if store
        
        customer = Stripe::Customer.create(
          :email => location.email,
          :source => token,
        )
        charge = Stripe::Charge.create(
          :amount => amount * 100,
          :currency => "usd",
          :customer => customer.id,
        )
        stripeid = {:stripe_customer_id => customer.id}
        render :json => stripeid
      else
        charge = Stripe::Charge.create(
          :amount => amount * 100,
          :currency => "usd",
          :description => "for replate",
          :source => token,
        )
        render :json => {}
      end
      
    end
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
      :lon
    )

  end

  private

end
