# Configuring lookup for Timezone with google api key
Timezone::Lookup.config(:google) do |c|
  c.api_key = Figaro.env.google_api_key
end
