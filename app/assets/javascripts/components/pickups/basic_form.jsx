/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop close    - callback to close modal
 * @prop isEdit    - callback to close modal
 */

var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class BasicForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    // Default to one time pickup
    if (!this.state.frequency) {
      this.state.frequency = "one_time";
    }
    // Default start date to today
    if (!this.state.start_date_display) {
      this.state.start_date_display = this._getToday();
    }
    // Set start_time to 9:00AM by default
    if (!this.state.start_time) {
      this.state.start_time = "09:00 AM";
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
    return moment().format("L");
  }

  _setOneTime = () => {
    this.setState({ frequency : "one_time" });
  }

  _setWeekly = () => {
    this.setState({ frequency : "weekly" });
  }

  _formatDate = (date) => {
    let dateMoment = moment(date, "L");
    return dateMoment.format();
  }

  _getDayStr = (date) => {
    let dateMoment = moment(date, "L");
    return dateMoment.format("dddd").toLowerCase();
  }

  _getDay = (date) => {
    let dateMoment = moment(date, "L");
    return dateMoment.day();
  }

  _addTwoHours = (time) => {
    let timeMoment = moment(time, 'LT');
    timeMoment.add(2, "hours");
    return timeMoment.format('LT');
  }

  _updateTime = (start_time) => {
      this.state.start_time = start_time;
  }

  _createRecurrence = () => {
    let pickupDayStr = this._getDayStr(this.state.start_date_display);
    let pickupDay = this._getDay(this.state.start_date_display);

    this.state.day = pickupDay - 1;

    recurrenceForm = {};
    for (let day of DAYSOFWEEK) {
      if (day === pickupDayStr) {
        recurrenceForm[day] = { active: true,
                                input: this.state,
                              };
      } else {
        recurrenceForm[day] = { active: false };
      }
    }
    this.props.nextStep(recurrenceForm, "recurrenceForm", false);
  }

  _nextStep = (e) => {
    this.state.isNextStep = true;
    this._validate();

    // Format start date
    this.state.start_date = this._formatDate(this.state.start_date_display);
    // Set end time - two hours after start time
    this.state.end_time = this._addTwoHours(this.state.start_time);

    if (this.state.frequency === "one_time") {
      this._createRecurrence();
    } else if (!this.props.isEdit) {
      this.props.nextStep({}, "recurrenceForm", false);
    }
    this.props.nextStep(this.state, "basicForm", this.state.validated, this.state.frequency);
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
            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="title" className="label label--newline">Title</label>
                  <input type="text" placeholder="Lunch Pickup" className="input"
                    value={this.state.title} name="title" id="title"
                    onChange={this._updateState} />
                  {this.state.titleValidation}
                </fieldset>
              </div>
              <div className="col-md-5" hidden={this.props.isEdit}>
                <fieldset className="input-container">
                  <label htmlFor="comments" className="label label--newline">Pickup Frequency</label>
                  <div className={`button button--margin` + (this.state.frequency === "weekly" ? ` button--text-green` : ``)} 
                       onClick={this._setOneTime}>One Time</div>
                  <div className={`button button--margin` + (this.state.frequency === "one_time" ? ` button--text-green` : ``)} 
                       onClick={this._setWeekly}>Weekly</div>
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className="col-md-7">
                <fieldset className="input-container">
                  <label className="label label--newline">{this.state.frequency === "weekly" ? "Start Date" : "Pickup Date"}</label>
                  <input type="text" data-provide='datepicker' data-date-start-date={this._getToday()} defaultValue={this.state.start_date_display}
                    name="start_date_display" onSelect={this._updateState}
                    className="input" placeholder="Click to select a day" />
                </fieldset>
              </div>
              <div className="col-md-5" hidden={this.state.frequency === "weekly"}>
                <TimeDropdown
                  label = "Pickup Time"
                  details = "9:00AM - 5:00PM"
                  input_id = "start"
                  form_name = "start_time"
                  update = {this._updateTime}
                  initData = {this.state.start_time} />
              </div>
            </div>

            <fieldset className="input-container name-container">
              <label htmlFor="comments" className="label label--newline">Comments</label>
              <textarea placeholder={placeholder} value={this.state.comments}
                name="comments" rows="6" cols="50" onChange={this._updateState}
                id="comments" className="input" />
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

BasicForm.propTypes = {
  initData : React.PropTypes.object.isRequired,
  nextStep : React.PropTypes.func.isRequired,
  close    : React.PropTypes.func.isRequired,
};