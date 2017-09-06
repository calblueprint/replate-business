class InvoicedController < ApplicationController

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

end

