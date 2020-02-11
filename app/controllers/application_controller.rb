class ApplicationController < ActionController::API
  include DeviseJwtAuth::Concerns::SetUserByToken
end
