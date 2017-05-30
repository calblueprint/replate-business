/**
 * Component for Business Signup
 *
 */
class SignupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      view: 1,
      loading: false,
    };
  }

  _saveBusiness = (b) => {
    this.state.business = b;
    this._createBusiness();
  }

  _createBusiness = () => {
    const success = (id) => {
      this.state.business_id = id.data;
      this.setState({ loading: false, view: 2, });
      window.scrollTo(0, 0);
    };
    const fail = (id) => {
      toastr.error("Email is already in use.")
      this.setState({ loading: false, });
    };

    this.setState({ loading: true, });

    this._attemptAction(APIConstants.sessions.signup,
      { business: this.state.business }, success, fail);
  }

  _saveLocation = (l) => {
    // After saving the location, callback to create business
    this.state.location = l
    this.setState({ loading: true})
    this._createLocation(this.state.business_id);
  }

  _createLocation = (businessID) => {
    const success = () => {
      window.location = "/dashboard";
    };
    const fail = () => {
      toastr.error("Location not valid, must have a specific address.");
      this.setState({ loading: false, });
    };

    let params = this.state.location;
    params["business_id"] = businessID;

    this._attemptAction(APIConstants.locations.create,
      params, success, fail);
  }

  render() {
    let renderedForm, loadingContainer;

    if (this.state.view == 1) {
      renderedForm = <BusinessSignup save = {this._saveBusiness}/>
    } else {
      renderedForm = <LocationSignup save        = {this._saveLocation}
                                     updatePhoto = {this._setPhotoFile} />
    }

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    return (
      <div style={{position: "relative"}}>
        {loadingContainer}
        {renderedForm}
      </div>
    );
  }
}
