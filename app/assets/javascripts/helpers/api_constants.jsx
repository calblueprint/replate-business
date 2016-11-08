class ApiConstants {
  get locations() {
    return {
      update : (id) => `/api/locations/${id}`,
      create : `/api/locations`
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
      update : (id) => `/api/businesses/${id}`
    }
  }
}

const APIConstants = new ApiConstants();
