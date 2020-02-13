module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :me, UserType, null: false,
      description: "The current user's information"
    def me
      context[:current_user]
    end
  end
end
