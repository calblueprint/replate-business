class InvoicedController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:webhook]

  def index
    if params['business']
      business = Business.find(params[business])
      render :nothing => true
    else
      redirect_to root_path
    end
  end

  def create
    business = Business.find(params['business'])
    business.make_invoice
    render :nothing => true
  end

  def webhook
    puts params
    render nothing: true, status: :ok
  end


end

