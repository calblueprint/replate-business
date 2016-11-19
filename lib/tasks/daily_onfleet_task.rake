namespace :daily_onfleet_task do
  desc 'Turn recurrences for today into tasks on Onfleet'
  task post_task: :environment do
    Recurrence.post_daily_task
  end
end
