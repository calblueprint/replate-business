Rails.application.routes.draw do
  devise_for :businesses
  devise_scope :business do
    get '/businesses/sign_out', to: 'devise/sessions#destroy'
    post '/businesses', to: 'devise/sessions#new'
  end
  devise_for :admins

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'styles' => 'pages#style'

  resources :admins
	resources :businesses
	resources :locations, :only => [:show]
	resources :requests, :only => [:show]
	resources :recurrences, :only => [:show]

  # Api definition
  namespace :api, defaults: { format: :json } do
    resources :locations, :only => [:create, :update, :destroy]
    resources :requests, :only => [:create, :update, :destroy]
    resources :recurrences, :only => [:create, :update, :destroy]
  end
end
