/**
 *
 @prop business_id - id of the business that is creating locations
 @prop success - success function that is called when location is created successfully!
 **/
class LocationCreationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      business_id : this.props.business_id,
      loading: false,
    }
  }

  _attemptCreate = (e) => {
    this.setState({ loading: true, });

    const success = (data) => {
      this.props.success();
      this.setState({ loading: false, });
      this.close();
    }

    // Allow loading animation to persist for 500ms
    setTimeout(() => {
      this._attemptAction(APIConstants.locations.create, this.state, success, success);
    }, 500)
  }

  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  render() {
    let loadingContainer;

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    return (
      <div className="new-location-component">
        <button onClick={this.open} type="button" className="button new-location-button">
          <span className="fa fa-plus marginRight-xxs"></span>
          Add a new location
        </button>
        <Modal show={this.state.showModal} onHide={this.close} className="location-creation-modal">
          {loadingContainer}
          <Modal.Header>
            <h3 className="modal-title">Add New Location</h3>
          </Modal.Header>
          <Modal.Body>
            <form className="modal-content">
              <fieldset className="input-container">
                <label className="label label--newline">Office Name</label>
                <input type="text" placeholder="New York Office" name="addr_name"
                       onChange={this._handleChange} className="input" />
              </fieldset>

              <div className="location-create-form-row">
                <fieldset className="input-container addr-num">
                  <label className="label label--newline">Number</label>
                  <input type="text" placeholder="1234" name="number"
                         onChange={this._handleChange} className="input" />
                </fieldset>

                <fieldset className="input-container addr-street">
                  <label className="label label--newline">Street</label>
                  <input type="text" placeholder="Grand Avenue" name="street"
                         onChange={this._handleChange} className="input" />
                </fieldset>
              </div>

              <div className="location-create-form-row">
                <fieldset className="input-container addr-city">
                  <label className="label label--newline">City</label>
                  <input type="text" placeholder="San Francisco" name="city"
                         onChange={this._handleChange} className="input" />
                </fieldset>

                <fieldset className="input-container addr-state">
                  <label className="label label--newline">State</label>
                  <select name="state" className="select"
                          onChange={this._handleChange}>
                    <option value="" disabled value>State</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhoda Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </select>
                </fieldset>
              </div>

              <div className="location-create-form-row">
                <fieldset className="input-container addr-country">
                  <label className="label label--newline">Country</label>
                  <input type="text" placeholder="USA" name="country"
                         onChange={this._handleChange} className="input" />
                </fieldset>

                <fieldset className="input-container addr-zip">
                  <label className="label label--newline">Zip/Postal Code</label>
                  <input type="text" placeholder="94709" name="zip"
                         onChange={this._handleChange} className="input" />
                </fieldset>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="button button--text-alert pull-left"
                    onClick={this.close}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this._attemptCreate}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

LocationCreationForm.propTypes = {
  business_id : React.PropTypes.number.isRequired,
  success     : React.PropTypes.func.isRequired
};
