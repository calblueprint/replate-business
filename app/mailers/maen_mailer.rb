class MaenMailer < ApplicationMailer
  def export_failed_tasks(task_csv, date)
    @date = date

    attachments["failure.csv"] = task_csv
    mail(to: "maen@re-plate.org", subject: 'failed pickup requests')
  end
end
