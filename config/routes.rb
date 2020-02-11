Rails.application.routes.draw do
  mount_devise_jwt_auth_for 'User', at: 'auth'
  namespace :api do
    #API ROUTES SHOULD GO HERE
  end

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
