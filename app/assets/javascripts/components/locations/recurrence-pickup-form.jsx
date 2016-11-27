/**
 * @prop initData  - saved data associated with the recurrence portion of the pickup form
 * @prop nextStep  - function handler to move on to next step of pickup creation
 * @prop prevStep  - function handler to move back to prev step of pickup creation
 */
class RecurrenceForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    if (jQuery.isEmptyObject(this.state)) {
      let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
        this.state[day] = {
          active: false,
          input: {},
        };
      });
    }
  }

  _toggleDay = (day) => {
    this.setState({ [day]: { active: !this.state[day].active,
                             input: this.state[day].input } });
  }

  _addTwoHours = (time) => {
    let formattedTime = "";
    let hour = parseInt(time.substring(0, 2));
    let isAM = time.substring(6, 8) === "AM";
    if (isAM && hour === 12) {
      formattedTime = '00' + time.substring(2, 6);
    } else if (!isAM) {
      hour += 11;
      formattedTime = "" + hour + time.substring(2, 6);
    } else {
      formattedTime = time.substring(0, 6);
    }
    momentTime = moment("01-01-1970 " + formattedTime); // arbitrary date
    if (momentTime.isValid()) {
      momentTime.add(2, 'hours');
      return momentTime.format('hh:mm A');
    }
    return undefined;
  }

  _formatDate = (date) => {
    //to format YYYY-mm-dd HH:mm:ss
    let formattedDate = "";
    date = date.split("/");
    formattedDate += date[2] + "-" + date[0] + "-" + date[1];
    formattedDate += " 00:00:00";
    return formattedDate;
  }

  _nextStep = (e) => {
    let validated = true;
    let requiredKeys = ["frequency", "start_time", "start_date"];
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      // Validate fields
      let validations = {};
      if (this.state[day].active) {
        // Set end time - two hours after start time
        let start_time = this.state[day].input.start_time;
        if (start_time) {
          this.state[day].input.end_time = this._addTwoHours(start_time);
        }
        // Format start date
        let start_date_display = this.state[day].input.start_date_display;
        if (start_date_display) {
          this.state[day].input.start_date = this._formatDate(start_date_display);
        }
        for (i = 0; i < requiredKeys.length; i++) {
          let requiredKey = requiredKeys[i];
          if (this.state[day].input[requiredKey] == undefined || this.state[[day].inputrequiredKey] == "") {
            let validationMsg = this._formatTitle(requiredKey) + " field must have a value.";
            validations[requiredKey] = validationMsg;
            validated = false;
          }
        }
      }
      // Hack for propogating validations to RecurrenceDayInput children
      this.state[day].validations = validations;
      let newState = React.addons.update(this.state, { [day]: { validations: { $set: validations } } });
      this.setState(newState);
    });
    this.props.nextStep(this.state, "recurrenceForm", validated);
  }

  _prevStep = (e) => {
    this.props.nextStep(this.state, "recurrenceForm", false);
    this.props.prevStep(this.state);
  }

  _updateState = (key, value, day) => {
    let newState = React.addons.update(this.state, { [day]: { input: { [key]: { $set: value } } } });
    this.setState(newState);
  }

  render() {
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      return <div className={`day-item day-` + (this.state[day].active ? "active" : "inactive")}
                  onClick={this._toggleDay.bind(this, day)}
                  key={i} >
                  {this._capitalize(day)}
      </div>
    });

    let dayInputs = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      if (this.state[day].active) {
        return <RecurrenceDayInput
                  day         = {day}
                  update      = {this._updateState}
                  initData    = {this.state[day].input}
                  key         = {i}
                  validations = {this.state[day].validations}/>
      }
    });

    return (
      <div>
        <Modal.Header closeButton>
          <h3 className="modal-title">New Pickup</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="week-container">
            {days}
          </div>
          <div className="day-input-container">
            {dayInputs}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" name="submit" value="Prev Step" className="submit-button" onClick={this._prevStep}>Back</button>
          <button type="submit" name="submit" value="Next Step" className="submit-button" onClick={this._nextStep}>Next</button>
        </Modal.Footer>
      </div>
    );
  }
}

RecurrenceForm.propTypes = {
  initData: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  prevStep: React.PropTypes.func.isRequired,
};
