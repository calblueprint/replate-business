class ExportFailedRecurrences

  HEADERS = ['Recipient Notes', 'Recipient Name', 'Recipient Phone',
             'Address Line 1', 'Address Line 2', 'City/Town', 'Postal Code',
             'State/Province', 'Country', 'Latitude', 'Longitude',
             'Task Details', 'Pickup', 'completeAfter (Local)',
             'completeBefore (Local)', 'Organization', 'Driver', 'Failure Reason']

  # failures format:
  # [{recurrence: *recurrence obj*, message: *str message*}, ...]
  def initialize(failures, date)
    @failures = failures
    @date = date
  end

  def export
    if @failures
      csv = generate_csv
      MaenMailer.export_tasks(csv, @date).deliver_now
    end
  end

  def generate_csv
    CSV.generate do |csv|
      csv << HEADERS
      @failures.each do |f|
        row = generate_row(f)
        csv << row
      end
    end
  end

  def generate_rows(failure)
    recurrence = failure[:recurrence]
    message = failure[:message]
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
      Driver.get(recurrence.driver_id),
      message
    ]
  end
end
