/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop prevStep - function handler to move back to prev step of pickup creation
 */
class ConfirmationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _prevStep = (e) => {
    this.props.prevStep();
  }

  _displayFoodType = (name) => {
    let food_type = { raw: "Raw",
                      catered: "Catered",
                      baked_goods: "Baked Goods",
                      packaged: "Packaged",
                    };
    return food_type[name];
  }

  _attemptCreate = (e) => {
    this.props.attemptCreate(this.state);
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <h3 className="modal-title">New Pickup</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-container">
            <div className="name-container">
              <h3>Title</h3>
              <p>{this.state.title}</p>
            </div>
            <div className="name-container">
              <h3>Caterer</h3>
              <p>{this.state.caterer}</p>
            </div>
            <div className="name-container">
              <h3>Food Type</h3>
              <p>{this._displayFoodType(this.state.food_type)}</p>
            </div>
            <div className="name-container">
              <h3>Comments</h3>
              <p>{this.state.comments}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" name="submit" value="Next Step" className="submit-button" onClick={this._prevStep}>Back</button>
          <button type="submit" name="submit" value="Create Pickup" className="submit-button" onClick={this._attemptCreate}>Create Pickup</button>
        </Modal.Footer>
      </div>
    );
  }
}


ConfirmationForm.propTypes = {
  initData : React.PropTypes.object.isRequired,
  prevStep : React.PropTypes.func.isRequired,
  attemptCreate : React.PropTypes.func.isRequired,
};
