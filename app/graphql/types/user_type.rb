module Types
  class UserType < Types::BaseObject
    field :provider, String, null: false
    field :uid, String, null: false
    field :allow_password_change, Boolean, null: false
    field :email, String, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end
