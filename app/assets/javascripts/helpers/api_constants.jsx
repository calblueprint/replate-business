class ApiConstants {
  get cancellations() {
    return {
      create : (id, date) => `/api/cancellations`,
      destroy : (id) => `/api/cancellations/${id}`,
    }
  }

  get sessions() {
    return {
      signup : `/signup`,
      create : `/api/sessions`,
    }
  }

  get locations() {
    return {
      update   : (id) => `/api/locations/${id}`,
      create   : `/api/locations`,
      week     : (id, today) => `/api/locations/${id}/week/${today}`,
      getTasks : (id) => `/api/locations/get-tasks/${id}`,
    }
  }

  get pickups() {
    return {
      update  : (id) => `/api/pickups/${id}`,
      create  : `/api/pickups`,
    }
  }


	get recurrences() {
    return {
      update : (id) => `/api/recurrences/${id}`,
      create : `/api/recurrences`,
    }
  }

<<<<<<< HEAD
  get task() {
    return {
      update : (id) => `/api/tasks/${id}`,
      create : `/api/tasks`,
=======
  get admin() {
    return {
      businessList    : `/api/businesses`,
      businessProfile : (id) => `/businesses/${id}`,
>>>>>>> 958b5a05130b739553f07da930374a064c0b5e59
    }
  }

  // fetchBusiness uses this route!
  get businesses() {
    return {
      show: (id) => `/api/businesses/${id}`,
      update : (id) => `/api/businesses/${id}`,
    }
  }
}

const APIConstants = new ApiConstants();
