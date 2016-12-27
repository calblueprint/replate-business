/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop close    - callback to close modal
 */
class BasicPickupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _nextStep = (e) => {
    let requiredKeys = ["title"];
    let validated = true;
    for (i = 0; i < requiredKeys.length; i++) {
      let requiredKey = requiredKeys[i];

      if (this.state[requiredKey] == undefined || this.state[requiredKey] == "") {
        let validationMsg = this._formatTitle(requiredKey) + " can't be empty.";
        let validation = <p className="validation-msg marginTop-xxs"
                            key={i}>{validationMsg}</p>

        this.setState({ [requiredKey + "Validation"] : validation, });
        validated = false;
      } else {
        delete this.state[requiredKey + "Validation"];
      }
    }
    this.props.nextStep(this.state, "basicForm", validated);
  }

  render() {
    let validations;
    const placeholder = "Let your driver know any special instructions, " +
                        "like gate codes, pickup locations, etc.";

    if (this.state.validations) {
      validations = this.state.validations.map((validation, i) => {
        return <p className="validation-msg marginTop-xxs" key={i}>{validation.message}</p>
      });
    }

    return (
      <div>
        <Modal.Body>
          {validations ? validations : undefined}
          <form className="modal-pickup-form">
            <fieldset className="input-container marginBot-sm">
              <label htmlFor="title" className="label label--newline">Title</label>
              <input type="text" placeholder="Lunch Pickup" className="input"
                defaultValue={this.state.title} name="title" id="title"
                onChange={this._handleChange} />
              {this.state.titleValidation}
            </fieldset>

            <fieldset className="input-container name-container">
              <label htmlFor="comments" className="label label--newline">Comments</label>
              <textarea placeholder={placeholder} defaultValue={this.state.comments}
                name="comments" rows="6" cols="50" onChange={this._handleChange}
                id="comments" className="input" />
              {this.state.commentsValidation}
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="button button--text-black marginRight-xs pull-left"
            onClick={this.props.close}>Cancel</button>
          <button type="submit" name="submit" value="Next Step"
            className="button submit-button" onClick={this._nextStep}>
              Next
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
        </Modal.Footer>
      </div>
    );
  }
}

BasicPickupForm.propTypes = {
  initData: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  close   : React.PropTypes.func.isRequired,
};
