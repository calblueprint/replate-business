class ApiConstants {
  get sessions() {
    return {
      signup : `/signup`,
    }
  }

  get locations() {
    return {
      update : (id) => `/api/locations/${id}`,
      create : `/api/locations`,
      week : (id, today) => `/api/locations/${id}/week/${today}`
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

  // fetchBusiness uses this route!
  get businesses() {
    return {
      update : (id) => `/api/businesses/${id}`,
    }
  }
}

const APIConstants = new ApiConstants();
