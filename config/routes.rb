Rails.application.routes.draw do
  devise_for :businesses
  devise_for :admins

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'styles' => 'pages#style'

  get 'dashboard' => 'businesses#home'

  resources :admins
  resources :businesses
  resources :locations, :only => [:show]
  #get '/locations', to: 'locations#index'
  resources :requests, :only => [:show]
  resources :recurrences, :only => [:show]

  # Api definition
  namespace :api, defaults: { format: :json } do
    resources :businesses, :only => [:show, :create, :update, :destroy]
    resources :locations, :only => [:show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update, :destroy]
    resources :recurrences, :only => [:create, :update, :destroy]
  end
end
