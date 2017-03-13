Rails.application.routes.draw do
  devise_for :businesses, :controllers => { registrations: 'registrations', sessions: 'sessions' }

  devise_scope :business do
    get '/businesses/sign_out', to: 'devise/sessions#destroy'
    post '/businesses', to: 'devise/sessions#new'

    get '/signup', to: 'devise/registrations#new'
    post '/signup', to: 'registrations#create'
  end

  devise_for :admins

  devise_scope :admins do

    get '/signup', to: 'devise/registrations#new'
    post '/signup', to: 'registrations#create'
  end

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'styles' => 'pages#style'
  get 'terms' => 'pages#terms'

  get 'dashboard' => 'businesses#home'

  resources :admins
  resources :businesses
  resources :locations, :only => [:show]
  get '/locations', to: 'locations#index'
  resources :pickups, :only => [:show]
  resources :recurrences, :only => [:show]

  #Export
  get 'export' => 'recurrences#export'

  # Api definition
  namespace :api, defaults: { format: :json } do
    resources :businesses, :only => [:show, :create, :update, :destroy]
    resources :locations, :only => [:show, :create, :update, :destroy]
    resources :pickups, :only => [:show, :create, :update, :destroy]
    resources :recurrences, :only => [:create, :update, :destroy]
    resources :cancellations, :only => [:create, :destroy]
    get '/locations/:id/week/:today', to: 'locations#this_week'
    resources :sessions, :only => [:create]
    get '/locations/:id/tasks', to: 'locations#tasks'
  end
end
