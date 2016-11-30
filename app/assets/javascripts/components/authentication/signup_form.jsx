/**
 * Component for Business Signup
 *
 */
class SignupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      view: 1,
    };
  }

  _saveBusiness = (b) => {
    this.setState({
      business: b,
      view: 2,
    })
    window.scrollTo(0, 0);
  }

  _createBusiness = () => {
    const success = (id) => {
      this._createLocation(id.data)
    };

    this._attemptAction(APIConstants.sessions.signup,
      { business: this.state.business }, success.bind(this));
  }

  _saveLocation = (l) => {
    // After saving the location, create business
    this.setState({ location: l }, this._createBusiness)
  }

  _createLocation = (businessID) => {
    const success = () => {
      window.location = "/dashboard";
    };

    let params = this.state.location;
    params["business_id"] = businessID;

    this._attemptAction(APIConstants.locations.create,
      params, success.bind(this));
  }

  render() {
    let renderedForm;

    if (this.state.view == 1) {
      renderedForm = <BusinessSignup save = {this._saveBusiness}/>
    } else {
      renderedForm = <LocationSignup save        = {this._saveLocation}
                                     updatePhoto = {this._setPhotoFile} />
    }

    return (
      <div>
        {renderedForm}
      </div>
    );
  }
}
