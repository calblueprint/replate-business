class ApiConstants {
  // When looking at the routes, the route names describe which api controller it sends the params to!
  // Whether it is a post, put, or get request is determined by the Requester class in requests/request.jsx
  // ie /api/locations will send the params to the controllers/api/locations_controller.rb
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

  // fetchBusiness uses this route!
  get businesses() {
    return {
      update : (id) => `/api/businesses/${id}`
    }
  }
}

const APIConstants = new ApiConstants();
