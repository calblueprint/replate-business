Rails.application.routes.draw do
  devise_for :businesses
  devise_for :admins
  get 'styles' => 'pages#style'

  # Api definition
  namespace :api, defaults: { format: :json },
                              path: '/api/'  do
    # We are going to list our resources here
  end
end
