class ApiConstants {

  get locations() {
    return {
      update : (id) => `/api/locations/${id}`,
      create : (id) => `/api/locations`
    }
  }

  get requests() {
    return {
      update : (id) => `/api/requests/${id}`,
      create : (id) => `/api/requests`, 
    }
  }

	get recurrences() {
    return {
      update : (id) => `/api/recurrences/${id}`,
      create : (id) => `/api/recurrences`
    }
  }
}

const APIConstants = new ApiConstants();