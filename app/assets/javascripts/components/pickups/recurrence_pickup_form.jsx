/**
 * @prop initData  - saved data associated with the recurrence portion of the pickup form
 * @prop nextStep  - function handler to move on to next step of pickup creation
 * @prop prevStep  - function handler to move back to prev step of pickup creation
 * @prop cancel    - callback to close modal
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class RecurrenceForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    if (jQuery.isEmptyObject(this.state)) {
      let days = DAYSOFWEEK.map((day, i) => {
        this.state[day] = {
          active: false,
          input: {},
        };
      });
    }
    this.state.isNextStep = false;
    this.state.validated = true;
  }

  _toggleDay = (day) => {
    this.state[day].active = !this.state[day].active;
    this.state.dayValidation = undefined;
    this.props.nextStep(this.state, "recurrenceForm", false);
  }

  _renderDirections = (days) => {
    showDirections = true;
    for (let i = 0; i < days.length; i += 1) {
      if (days[i]) { showDirections = false; }
    }

    if (showDirections) {
      return <p style={{textAlign: 'center'}}>Choose all the days that you'd like this pickup to occur!</p>
    }
  }

  _addTwoHours = (time) => {
    let timeMoment = moment(time, 'HH:mm A');
    timeMoment.add(2, "hours");
    return timeMoment.format('hh:mm A');
  }

  _formatDate = (date) => {
    let dateMoment = moment(date, "MM/DD/YYYY");
    return dateMoment.format("YYYY-MM-DD HH:mm:ss")
  }

  _setValidated = (valid) => {
    console.log("set validated to: " + valid);
    this.state.validated = valid;
  }

  _nextStep = (e) => {
    this.setState({ isNextStep : true }, this._validate);
  }

  _validate = () => {
    let requiredKeys = ["frequency", "start_time", "start_date"];
    let hasActive = false;
    let days = DAYSOFWEEK.map((day, i) => {
      if (this.state[day].active) {
        hasActive = true;
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
      }
    });
    if (!hasActive) {
      this.state.validated = false;
      this.setState({dayValidation : <p className="validation-msg marginTop-xxs"
                    key={i}>You must select at least one day.</p>});
    }
    console.log("this.state.validated ? " + this.state.validated);
    this.props.nextStep(this.state, "recurrenceForm", this.state.validated);
  }

  _prevStep = (e) => {
    this.props.nextStep(this.state, "recurrenceForm", false);
    this.props.prevStep(this.state);
  }

  _updateState = (key, value, day) => {
    this.state[day].input[key] = value;
    this.props.nextStep(this.state, "recurrenceForm", false);
  }

  render() {
    let days = DAYSOFWEEK.map((day, i) => {
      const status = `pickup-btn--${this.state[day].active ? "active" : "inactive"}`;
      return (
        <div className={`pickup-btn ${status}`}
             onClick={this._toggleDay.bind(this, day)}
             key={i} >
             {this._capitalize(day)}
        </div>
      )
    });

    let isNextStep = this.state.isNextStep
    let dayInputs = DAYSOFWEEK.map((day, i) => {
      if (this.state[day].active) {
        return <RecurrenceDayInput
                  day          = {day}
                  update       = {this._updateState}
                  initData     = {this.state[day].input}
                  key          = {i}
                  isNextStep   = {this.state.isNextStep}
                  setValidated = {this._setValidated}/>
      } else {
        return null;
      }
    });

    this.state.isNextStep = false;

    return (
      <div>
        <Modal.Body>
          <div className="pickup-form-week">
            { days }
          </div>
          <div className="day-input-container">
            { this._renderDirections(dayInputs) }
            { dayInputs }
          </div>
          {this.state.dayValidation}
        </Modal.Body>
        <Modal.Footer>
          <button className="button button--text-alert marginRight-xs pull-left"
            onClick={this.props.close}>Cancel</button>
          <button type="submit" name="submit" value="Prev Step"
            className="button button--text-black marginRight-xxs"
            onClick={this._prevStep}>
            <span className="fa fa-angle-left marginRight-xxs"></span>
            Back
          </button>
          <button type="submit" name="submit" value="Next Step"
            className="button" onClick={this._nextStep}>
              Next
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
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
