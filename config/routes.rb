Rails.application.routes.draw do
  devise_for :businesses
  devise_scope :business do
    get 'businesses/sign_out', to: 'devise/sessions#destroy'
  end
  devise_scope :business do
    post 'businesses', to: 'business/sessions#new'
  end
  devise_for :admins

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'styles' => 'pages#style'

  get 'dashboard' => 'businesses#home'

  resources :admins
  resources :businesses
  resources :locations, :only => [:show]
  get '/locations', to: 'locations#index'
  resources :requests, :only => [:show]
  resources :recurrences, :only => [:show]

  # Api definition
  namespace :api, defaults: { format: :json } do
    resources :locations, :only => [:show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update, :destroy]
    resources :recurrences, :only => [:create, :update, :destroy]
  end
end
