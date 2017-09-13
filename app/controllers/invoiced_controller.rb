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
    # Refactor to call event from API first so as to avoid messy nonsense
    invoice_number = params['data']['object']['id']
    invoice_tasks = Task.where(invoice_number: invoice_number)
    invoice_tasks.each do |task|
      task.paid = true
      task.save
    end
    render nothing: true, status: :ok
  end


end

