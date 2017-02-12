class Driver
  # a temporary place to put two drivers. Depending on
  # whether or not onfleet will continually be used,
  # may need to become a model
  DRIVERS_HASH = {
    'Wxi7dpU3VBVSQoEnG3CgMRjG' => 'Matthew Stephanovich',
    'PWWyG9w4KS44JOlo2j2Dv8qT' => 'Marcus Jones'
  }

  def self.get(id)
    DRIVERS_HASH[id]
  end
end
