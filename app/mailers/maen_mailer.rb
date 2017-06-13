class MaenMailer < ApplicationMailer

  def export_tasks(task_csv, date)
    @date = date
    attachments["pickups.csv"] = task_csv
    mail(to: maen_email, subject: "all requests for #{@date}")
  end

  def export_failed_tasks(task_csv, date)
    @date = date
    attachments["failure.csv"] = task_csv
    mail(to: maen_email, subject: 'failed pickup requests')
  end

  def export_on_demand_task(task_csv, date)
    @date = date
    attachments["on_demand.csv"] = task_csv
    mail(to: maen_email, subject: 'On demand task')
  end

  def export_cancellation(recurrence, date=Date.today)
    @date = date
    @recurrence = recurrence
    mail(to: maen_email, subject: 'Cancellation')
  end

  def onfleet_update(recurrence, date=Date.today)
    @date = date
    @recurrence = recurrence
    mail(to: maen_email, subject: 'Task update')
  end

  def maen_email
    'maen@re-plate.org, info@re-plate.org'
  end
end
