class LocationCreationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { business_id : this.props.business_id }
  }

  _attemptCreate = (e) => {
    const success = (data) => {
      this.props.success();
      this.close();
    }
    this._attemptAction(APIConstants.locations.create, this.state, success, success);
    }

  // simple functions for showing/closing the modal
  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="action-item create-item">
        <div data-toggle="modal fade" data-target="#newLocationModal" >
          <button onClick={this.open} type="button" className="button new-location-button">
            Add a new location
          </button>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <div className="modal-header">
              <h3 className="modal-title">Create New Location</h3>
            </div>
          </Modal.Header>
          <Modal.Body>
          <form className="modal-content">
            <div className="modal-body">
              <fieldset className="input-container name-container">
                <label>Office Title</label>
                <input type="text" placeholder="Add a Title" ref="focus" name="addr_name" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>Number</label>
                <input type="text" placeholder="Street Number" name="number" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>Street</label>
                <input type="text" placeholder="Street Address" name="street" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>City</label>
                <input type="text" placeholder="Add a city" name="city" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                              <label>State</label>
                              <select name="state" onChange={this._handleChange}>
                                <option value="" disabled selected>State</option>
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
                <fieldset className="input-container name-container">
                        <label>Country</label>
                        <input type="text" placeholder="Country" name="country" onChange={this._handleChange} />
                </fieldset>
              <fieldset className="input-container name-container">
                <label>Zip/Postal Code</label>
                <input type="text" placeholder="Add a zip" name="zip" onChange={this._handleChange} />
              </fieldset>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
          <div className="modal-footer">
            <button type="button" className="button" onClick={this.close}>Cancel</button>
            <button type="submit" name="submit" value="Create Location" className="submit-button" onClick={this._attemptCreate}>Create</button>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}


LocationCreationForm.propTypes = {
  business_id : React.PropTypes.number.isRequired,
  success : React.PropTypes.func.isRequired
};
