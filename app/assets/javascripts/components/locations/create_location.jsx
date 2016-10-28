// Here we extend from the DefaultForm class located in templates.
// This gives us access to key functions we've inhereted from our parent class,
// including how we will make post requests! Be sure to check out that class
// for more information. I render this component (pass in props) in the
// business_dashboard.jsx render() function.

/**
* FILL IN YOUR PROPS HERE I already have a few! See if you may need more? (not necessarily!)
@prop business_id - id of the business that is creating locations
@prop success - success function that is called when location is created successfully!
**/
class LocationCreationForm extends DefaultForm {

  constructor(props) {
    // I'm pretty sure this is where we get the props passed in from business_dashboard
    super(props);
    /**
    * ADD THE VALUE PAIR FOR business_id TO THE STATE.
    * THE FORMAT IS business_id : prop. I did this one for you for now
    * the state will now contain a dictionary of key value pairs corresponding to
    * attributes on the input form.
    **/
    this.state = { business_id : this.props.business_id }
  }


  // This function will handle posting the form information to the right url
  _attemptCreate = (e) => {
    // 'success' is a variable name bound to a function that takes in parameter 'msg'
    // Try to find out what the original success function is and try to figure out what it does!
    // This is very important since you may have to fiddle with this. Essentially the sucess function
    // that is passed it will update the dashboard to show the locations including the new one, make sure
    // the new one is showing properly!
    const success = (data) => {
      this.props.success();
      this.close();
    }
    /**
    * TODO: FILL IN THE PARAMETERS FOR _attemptAction()
    * hint: look in default_forms.jsx! Also check out create_request.jsx
    **/
    this._attemptAction();
    }

  // simple functions for showing/closing the modal
  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  // Here is the code that will determine what shows up on the html page!
  // I've copy pasted a form template that you can customize the input fields with.
  // You should replace the items betwen the <label> tages, as well as the name="" attribute,
  // as well as other form attributes.
  // Whatever is in the name="" attribute will become the param key, with the value set to
  // whatever the user inputs.

  // this._handleChange will update the state, or the dictionary of params the use has input so far!
  //  look at default form to see more about this function.
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
                <label>attribute</label>
                <input type="text" placeholder="Add a title" ref="focus" name="attribute" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>Caterer</label>
                <input type="text" placeholder="Add a caterer" name="caterer" onChange={this._handleChange} />
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
  /**
  * FILL IN THE CONSTRAINTS FOR ALL PROPS i.e.
  * success : React.PropTypes.func.isRequired
  * hint: see create_requests.jsx!
  * we use contraints to declare that the prop MUST be of a certain type to avoid sketchiness
  **/
};
