Rails.application.routes.draw do
  devise_for :businesses
  devise_for :admins
  get 'styles' => 'pages#style'

  # Api definition
  namespace :api, defaults: { format: :json },
                              constraints: { subdomain: 'api' }, path: '/'  do
  	resources :admins
    resources :businesses
    resources :locations
    resources :requests
    resources :recurrences
  end
end
