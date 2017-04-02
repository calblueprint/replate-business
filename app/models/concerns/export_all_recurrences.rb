class ExportAllRecurrences

  HEADERS = ['Recipient Notes', 'Recipient Name', 'Recipient Phone',
             'Address Line 1', 'Address Line 2', 'City/Town', 'Postal Code',
             'State/Province', 'Country', 'Latitude', 'Longitude',
             'Task Details', 'Pickup', 'completeAfter (Local)',
             'completeBefore (Local)', 'Organization', 'Driver']

  # args:
    # args[:date] = DateTime obj of day the tasks were to be posted
    # if exporting failures:
    #   args[:error] = hash where key is recurrence and
    #                  value is error for that recurrence
    # if exporting all tasks for a day:
    #   args[:tasks] = array of recurrence objects

  def initialize(args)
    @date = args[:date]
    @tasks = nil
    @errors = nil
    if args[:error]
      @errors = args[:error]
    else
      @tasks = args[:tasks]
    end
  end

  def export_all
    if @tasks
      csv = generate_csv
      MaenMailer.export_tasks(csv, @date).deliver_now
    end
  end

  def export_on_demand_task
    if @tasks
      csv = generate_csv
      MaenMailer.export_on_demand_task(csv, @date).deliver_now
    end
  end

  def export_cancelled_task
    if @tasks
      csv = generate_csv
      MaenMailer.export_cancelled_task(csv, @date).deliver_now
    end
  end

  def export_failures
    HEADERS << ("failure message")
    csv = generate_failure_csv
    MaenMailer.export_failed_tasks(csv, @date).deliver_now
  end

  def generate_failure_csv
    CSV.generate do |csv|
      csv << HEADERS
      @errors.each do |key, value|
        row = generate_error_row(key, value)
        csv << row
      end
    end
  end

  def generate_csv
    CSV.generate do |csv|
      csv << HEADERS
      @tasks.each do |f|
        row = generate_row(f)
        csv << row
      end
    end
  end

  def generate_error_row(recurrence, failure)
    row = generate_row(recurrence)
    row << failure
    row
  end

  def generate_row(recurrence)
    start_time = @date.strftime("%m/%d/%Y") + " #{recurrence.start_time}"
    end_time = @date.strftime("%m/%d/%Y") + " #{recurrence.end_time}"
    [
      '',
      recurrence.business.company_name,
      recurrence.business.phone,
      recurrence.location.line1,
      recurrence.location.line2,
      recurrence.location.city,
      recurrence.location.zip,
      recurrence.location.state,
      recurrence.location.country,
      '',
      '',
      recurrence.pickup.comments,
      true,
      start_time,
      end_time,
      recurrence.business.company_name,
      Driver.get(recurrence.driver_id)
    ]
  end
end
