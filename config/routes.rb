Rails.application.routes.draw do
  devise_for :businesses
  devise_for :admins

  # Static Pages
  root 'pages#home'
  get 'business' => 'pages#business'
  get 'styles' => 'pages#style'
end
