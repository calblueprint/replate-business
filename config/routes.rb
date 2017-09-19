Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/administration_dashboard', as: 'rails_admin'
  devise_for :businesses, :controllers => { registrations: 'registrations', sessions: 'sessions' }

  devise_scope :business do
    get '/businesses/sign_out', to: 'devise/sessions#destroy'
    post '/businesses', to: 'devise/sessions#new'

    get '/signup', to: 'devise/registrations#new'
    post '/signup', to: 'registrations#create'
  end

  devise_for :admins

  devise_scope :admins do
    get 'admin/search' => 'admins#search'
    get 'businesses/:id' => 'businesses#show'
  end

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'about_us' => 'pages#about_us'
  get 'styles' => 'pages#style'
  get 'terms' => 'pages#terms'

  get 'dashboard' => 'businesses#home'
  get 'admin_dashboard' => 'admins#home'

  resources :admins
  resources :businesses, :only => [:home]
  resources :locations, :only => [:show]
  get '/locations', to: 'locations#index'
  resources :pickups, :only => [:show]
  resources :recurrences, :only => [:show]
  resources :onfleet_webhooks, :only => [:index, :create]
  resources :invoiced, :only => [:index, :create, :webhook] do
    # route to receive Invoiced webhook
    post 'webhook', on: :collection
  end
  #Export
  get 'export' => 'recurrences#export'

  # Api definition
  namespace :api, defaults: { format: :json } do
    resources :businesses, :only => [:show, :create, :update, :destroy, :charge]
    resources :locations, :only => [:show, :create, :update, :destroy]
    resources :pickups, :only => [:show, :create, :update, :destroy]
    resources :recurrences, :only => [:create, :update, :destroy]
    resources :cancellations, :only => [:create, :destroy]
    resources :tasks, :only => [:show, :create, :update, :destroy]
    get '/locations/:id/week/:today', to: 'locations#this_week'
    get '/locations/get-tasks/:id/', to: 'locations#get_tasks'
    resources :sessions, :only => [:create]
    post '/businesses/:id/charge', to: 'businesses#charge'
    post '/locations/:id/charge', to: 'locations#charge'
    get '/locations/:id/tasks', to: 'locations#find_tasks'
    patch '/locations/:id/tasks', to: 'locations#mark_tasks_paid'
    devise_scope :admins do
      resources :businesses, :only => [:index]
    end
  end

  get '*path' => redirect('/')
end



