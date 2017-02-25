namespace :delete_old_cancellations do
  desc 'Remove old cancellations to not crowd database'
  task destroy: :environment do
    Cancellation.destroy_all("date < '#{Date.today}'")
  end
end
