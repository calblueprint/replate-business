class MaenMailer < ApplicationMailer
  def failed_daily_task(tasks)
    recipients  "maen@re-plate.org"
    from        "Daily Task Bot <bot@replate.com>"
    subject     "Daily failures"
    sent_on     Time.now
    body        {:tasks => tasks}
  end
end
