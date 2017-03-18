class Ability
  include CanCan::Ability

  def initialize(user)
    puts user.is_a?(Business)
    if user.is_a?(Business)
      user ||= Business.new
      can :read, Location, business_id: user.id
    else
      if user.is_a?(Admin)
        can :read, :all
        can :manage, :all
      end
    end
  end
end
