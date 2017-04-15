class Ability
  include CanCan::Ability

  def initialize(user)
<<<<<<< HEAD
=======
    puts user.is_a?(Business)
>>>>>>> 958b5a05130b739553f07da930374a064c0b5e59
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
