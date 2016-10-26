class ApiConstants {

  get locations() {
    return {
      update : (id) => `/api/locations/${id}`,
      create : `/api/locations`
    }
  }

  get requests() {
    return {
      update : (id) => `/api/requests/${id}`,
      create : `/api/requests`, 
    }
  }

	get recurrences() {
    return {
      update : (id) => `/api/recurrences/${id}`,
      create : `/api/recurrences`
    }
  }
}

const APIConstants = new ApiConstants();