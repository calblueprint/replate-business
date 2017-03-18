/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop close    - callback to close modal
 * @prop isEdit    - callback to close modal
 */
class BasicForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    // Default to one time pickup
    if (!this.state.frequency) {
      this.state.frequency = "one_time";
    }
    if (!this.state.start_date_display) {
      this.state.start_date_display = this._getToday();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.initData;
  }

  _updateState = (e) => {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this.props.nextStep(this.state, "basicForm", false);
  }

  _getToday = () => {
    return moment().format("MM/DD/YYYY");
  }

  _setOneTime = () => {
    this.setState({ frequency : "one_time" });
  }

  _setWeekly = () => {
    this.setState({ frequency : "weekly" });
  }

  _nextStep = (e) => {
    const _formatDate = (date) => {
      let dateMoment = moment(date, "L");
      return dateMoment.format();
    }

    this.state.isNextStep = true;
    this._validate();
    // Format start date
    this.state.start_date = _formatDate(this.state.start_date_display);

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
                value={this.state.title} name="title" id="title"
                onChange={this._updateState} />
              {this.state.titleValidation}
            </fieldset>

            <fieldset className="input-container name-container">
              <label htmlFor="comments" className="label label--newline">Comments</label>
              <textarea placeholder={placeholder} value={this.state.comments}
                name="comments" rows="6" cols="50" onChange={this._updateState}
                id="comments" className="input" />
              {this.state.commentsValidation}
            </fieldset>

            <div className="row marginTop-sm">
              <div className="col-md-6">
                <fieldset className="input-container name-container">
                  <label htmlFor="comments" className="label label--newline">Pickup Frequency</label>
                  <div className={`button button--margin` + (this.state.frequency === "weekly" ? ` button--text-green` : ``)} 
                       onClick={this._setOneTime}>One Time</div>
                  <div className={`button button--margin` + (this.state.frequency === "one_time" ? ` button--text-green` : ``)} 
                       onClick={this._setWeekly}>Weekly</div>
                </fieldset>
              </div>
              <div className="col-md-6">
                <fieldset className="input-container">
                  <label className="label label--newline">{this.state.frequency === "weekly" ? "Start Date" : "Pickup Date"}</label>
                  <input type="text" data-provide='datepicker' data-date-start-date={this._getToday()} defaultValue={this.state.start_date_display}
                    name="start_date_display" onSelect={this._updateState}
                    className="input" placeholder="Click to select a day" />
                </fieldset>
              </div>
            </div>
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

BasicForm.propTypes = {
  initData : React.PropTypes.object.isRequired,
  nextStep : React.PropTypes.func.isRequired,
  close    : React.PropTypes.func.isRequired,
};