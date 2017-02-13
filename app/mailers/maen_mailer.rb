class MaenMailer < ApplicationMailer
  def export_tasks(task_csv, date)
    @date = date
    attachments["pickups.csv"] = task_csv
    mail(to: "maen@re-plate.org", subject: "all requests for #{@date}")
  end

  def export_failed_tasks(task_csv, date)
    @date = date
    attachments["failure.csv"] = task_csv
    mail(to: "maen@re-plate.org", subject: 'failed pickup requests')
  end

  def export_on_demand_task(task_csv, date)
    @date = date
    attachments["on_demand.csv"] = task_csv
    mail(to: "maen@re-plate.org", subject: 'On demand task')
  end
end
