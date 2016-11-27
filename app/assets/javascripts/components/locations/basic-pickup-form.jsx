/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 */
class BasicPickupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _nextStep = (e) => {
    let requiredKeys = ["title", "comments"];
    let validated = true;
    for (i = 0; i < requiredKeys.length; i++) {
      let requiredKey = requiredKeys[i];
      if (this.state[requiredKey] == undefined || this.state[requiredKey] == "") {
        let validationMsg = this._formatTitle(requiredKey) + " field must have a value.";
        this.setState({ [requiredKey + "Validation"] : <p key={i}>{validationMsg}</p> });
        validated = false;
      } else {
        delete this.state[requiredKey + "Validation"];
      }
    }
    this.props.nextStep(this.state, "basicForm", validated);
  }

  render() {
    let validations;
    if (this.state.validations) {
      validations = this.state.validations.map((validation, i) => {
        return <p key={i}>{validation.message}</p>
      });
    }
    return (
      <div>
        <Modal.Header closeButton>
          <h3 className="modal-title">New Pickup</h3>
        </Modal.Header>
        <Modal.Body>
          {validations ? validations : undefined}
          <form className="modal-pickup-form">
            <fieldset className="input-container name-container">
              <label>Title</label>
              <input type="text" placeholder="Add a title" defaultValue={this.state.title} ref="focus" name="title" onChange={this._handleChange} />
              {this.state.titleValidation}
            </fieldset>

            <fieldset className="input-container name-container">
              <label>Comments</label>
              <textarea placeholder="Add a comment" defaultValue={this.state.comments} name="comments" rows="10" cols="50" onChange={this._handleChange} />
              {this.state.commentsValidation}
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" name="submit" value="Next Step" className="submit-button" onClick={this._nextStep}>Next</button>
        </Modal.Footer>
      </div>
    );
  }
}

BasicPickupForm.propTypes = {
  initData: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.func.isRequired,
};
