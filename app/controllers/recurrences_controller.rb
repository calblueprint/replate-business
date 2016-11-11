class RecurrencesController < ApplicationController
  require 'csv'

  def export
    @recurrences = Recurrence.all
      respond_to do |format|
        format.html
        format.csv do
          headers['Content-Disposition'] = 'attachment; filename=\'tasks.csv\''
          headers['Content-Type'] ||= 'text/csv'
        end
      end
  end
end
