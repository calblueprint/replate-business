class ApiConstants {
  get sessions() {
    return {
      signup : `/signup`,
      create : `/api/sessions`
    }
  }

  get locations() {
    return {
      update : (id) => `/api/locations/${id}`,
      create : `/api/locations`,
      week   : (id, today) => `/api/locations/${id}/week/${today}`
    }
  }

  get pickups() {
    return {
      update : (id) => `/api/pickups/${id}`,
      create : `/api/pickups`,
    }
  }


	get recurrences() {
    return {
      update : (id) => `/api/recurrences/${id}`,
      create : `/api/recurrences`
    }
  }

  get task() {
    return {
      update : (id) => `/api/task/${id}`,
      create : `/api/task`
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
