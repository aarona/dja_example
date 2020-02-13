Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # get 'me', action: :index, controller: :me
  mount_devise_jwt_auth_for 'User', at: 'auth'

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
