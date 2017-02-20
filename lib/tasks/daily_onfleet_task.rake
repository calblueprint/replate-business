namespace :daily_onfleet_task do
  desc 'Post recurrences as tasks onto onfleet and update existing task statusess'
  task post_task: :environment do
    # This task is called at 7:30am UTC (11:30pm PST) every day
    # Time.now.wday is int for weekday 0 indexed at sunday.
    # Our day enum is zero indexed at monday.

    # TODAY: int representing tomorrow's day of week in recurrence enum
    # TOMORROW: datetime object represending tomorrow' date.
    puts "task~"
    tomorrow_wday = Time.now.wday
    tomorrow_date = Date.today + 1

    result = OnfleetAPI.post_batch_task(tomorrow_wday, tomorrow_date)
    posted = result[:posted]
    args = {:date => tomorrow, :tasks => posted}
    ExportAllRecurrences.new(args).export_all
  end
end
