namespace :daily_onfleet_task do
  desc 'Post recurrences as tasks onto onfleet and update existing task statuses'
  task post_task: :environment do
    # This task is called at 7:30 AM UTC (11:30pm PST) every day
    # Time.now.wday is int for weekday 0 indexed at Sunday.
    # Our day enum is zero indexed at Monday.

    # tomorrow_wday: int representing tomorrow's day of week in recurrence enum
    # tomorrow_date: date object representing tomorrow' date.

    # Run ONLY on Sunday evening through Thursday evening
    if Time.now.wday < 5
      tomorrow_wday = Time.now.wday + 1
      tomorrow_date = Date.today + 1
      result = OnfleetAPI.post_batch_task(tomorrow_wday, tomorrow_date)
      posted = result[:posted]
      args = {:date => tomorrow_date, :tasks => posted}
      ExportAllRecurrences.new(args).export_all
    end
  end
end
