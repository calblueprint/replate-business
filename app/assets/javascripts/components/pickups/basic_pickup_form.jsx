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

  _updateState = (e) => {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this.props.nextStep(this.state, "basicForm", false);
  }

  _nextStep = (e) => {
    this.state.isNextStep = true;
    this._validate();
    this.props.nextStep(this.state, "basicForm", this.state.validated);
  }

  _validate = () => {
    let requiredKeys = ["title"];
    this.state.validated = true;
    for (i = 0; i < requiredKeys.length; i++) {
      let requiredKey = requiredKeys[i];
      let invalid = this.state[requiredKey] === undefined || this.state[requiredKey] === "";
      if (this.state.isNextStep && invalid) {
        let validationMsg = this._formatTitle(requiredKey) + " can't be empty.";
        let validation = <p className="validation-msg marginTop-xxs"
                            key={i}>{validationMsg}</p>

        this.state[requiredKey + "Validation"] = validation;
        this.state.validated = false;
      } else if (!invalid) {
        delete this.state[requiredKey + "Validation"];
      }
    }
  }

  render() {
    const placeholder = "Let your driver know any special instructions, " +
                        "like gate codes, pickup locations, etc.";
    this._validate();
    this.state.isNextStep = false;

    return (
      <div>
        <Modal.Body>
          <form className="modal-pickup-form">
            <fieldset className="input-container marginBot-sm">
              <label htmlFor="title" className="label label--newline">Title</label>
              <input type="text" placeholder="Lunch Pickup" className="input"
                defaultValue={this.state.title} name="title" id="title"
                onChange={this._updateState} />
              {this.state.titleValidation}
            </fieldset>

            <fieldset className="input-container name-container">
              <label htmlFor="comments" className="label label--newline">Comments</label>
              <textarea placeholder={placeholder} defaultValue={this.state.comments}
                name="comments" rows="6" cols="50" onChange={this._updateState}
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
