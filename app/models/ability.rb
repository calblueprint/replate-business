class Ability
  include CanCan::Ability

  def initialize(business)

    business ||= Business.new

    can :read, Location, business_id: business.id
  end
end
