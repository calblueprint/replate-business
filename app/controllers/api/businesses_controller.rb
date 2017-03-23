class API::BusinessesController < ApplicationController
  def show
    @business = Business.find(params[:id])
    render json: @business, each_serializer: BusinessSerializer, root: false
  end

  def update
    business = Business.find(params[:id])
    if business.update business_params
      render_json_message(:ok, message: 'Business successfully updated!')
    else
      render_json_message(:forbidden, errors: business.errors.full_messages)
    end
  end

  def charge
    business = Business.find(params[:id])
    puts Figaro.env.stripe_api_key
    Stripe.api_key = Figaro.env.stripe_api_key
    useSaved = params[:useSaved]
    amount = params[:chargeAmount]
    if business.stripe_customer_id != nil and useSaved
      puts "using saved"
      charge = Stripe::Charge.create(
      :amount => amount * 100, # $15.00 this time
      :currency => "usd",
      :customer => business.stripe_customer_id, # Previously stored, then retrieved
      )
      render :json => {}
    else
      token = params[:stripeToken]
      customer = Stripe::Customer.create(
      :email => "paying.user@example.com",
      :source => token,
      )
      charge = Stripe::Charge.create(
      :amount => amount * 100,
      :currency => "usd",
      :customer => customer.id,
      )
      stripeid = {:stripe_customer_id => customer.id}
      render :json => stripeid
    end
  end

  def business_params
    params.permit(
      :company_name,
      :website_url,
      :phone,
      :email,
      :stripe_customer_id
    )
  end
end
