# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :trackable,
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseJwtAuth::Concerns::User
end
