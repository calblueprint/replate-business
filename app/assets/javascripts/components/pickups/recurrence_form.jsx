/**
 * @prop initData    - saved data associated with the recurrence portion of the pickup form
 * @prop nextStep    - function handler to move on to next step of pickup creation
 * @prop prevStep    - function handler to move back to prev step of pickup creation
 * @prop frequency   - frequency of pickup
 * @prop start_date  - start date of pickup
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
    this.state.validated = true;
  }

  _toggleDay = (day) => {
    this.state[day].active = !this.state[day].active;
    this.state.showDayValidation = false;
    this.props.nextStep(this.state, "recurrenceForm", false);
  }

  _renderSelectDayValidation = (days) => {
    showSelectDayValidation = true;
    for (let i = 0; i < days.length; i += 1) {
      if (days[i]) { showSelectDayValidation = false; }
    }

    if (showSelectDayValidation) {
      return <p style={{textAlign: 'center'}}>Choose all the days that you'd like this pickup to occur!</p>
    }
  }

  _setValidated = (valid) => {
    this.state.validated = valid;
  }

  _nextStep = (e) => {
    this._validate();
  }

  _validateTimes = (start_date_display, start_time, day_num) => {
    const _toNextDay = (moment, day) => {
      let diff = day - moment.day() + 1;
      if (diff < 0) {
        diff += 7;
      }
      moment.add(diff, "day");
    }
    // Check if pickup time is too close to now
    let recurrenceTimeStr = start_date_display + " " + start_time;
    let recurrenceMoment = moment(recurrenceTimeStr, "L LT");
    _toNextDay(recurrenceMoment, day_num);

    if (recurrenceMoment.isBefore(moment())) {
      this.state.validated = false;
      toastr.error("Pickups cannot occur before the current time!");
    } else if (recurrenceMoment.diff(moment(), "minutes") <= 60) {
      let warningStr = "Warning";
      let detailStr = "In the future, please schedule your pickup at least an hour in advance!"
                      + " \nYour pickup on " + recurrenceMoment.format("L") + " at "
                       + recurrenceMoment.format("hh:mm:A") + " will still occur.";
      toastr.error(detailStr, warningStr);
    }
  }

  _validate = () => {
    const _addTwoHours = (time) => {
      let timeMoment = moment(time, 'LT');
      timeMoment.add(2, "hours");
      return timeMoment.format('LT');
    }

    this.state.validated = true;

    let noneActive = true;
    let days = DAYSOFWEEK.map((day, i) => {
      if (this.state[day].active) {
        noneActive = false;
        let start_date_display = this.props.basicData.start_date_display

        // Set end time - two hours after start time
        let start_time = this.state[day].input.start_time;
        if (start_time) {
          this.state[day].input.end_time = _addTwoHours(start_time);
        }
        // Set frequency and start_date
        this.state[day].input.frequency = this.props.basicData.frequency;
        this.state[day].input.start_date = this.props.basicData.start_date;

        this._validateTimes(start_date_display, start_time, i);
      }
    });
    if (noneActive) {
      this.state.validated = false;
      this.setState({showDayValidation : true });
    }
    this.props.nextStep(this.state, "recurrenceForm", this.state.validated);
  }

  _prevStep = (e) => {
    this.props.nextStep(this.state, "recurrenceForm", false);
    this.props.prevStep();
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

    let dayInputs = DAYSOFWEEK.map((day, i) => {
      if (this.state[day].active) {
        return <RecurrenceInput
                  day          = {day}
                  update       = {this._updateState}
                  initData     = {this.state[day].input}
                  key          = {i}/>
      } else {
        return null;
      }
    });

    let dayValidation = this.state.showDayValidation ? <p className="validation-msg marginTop-xxs" 
                                                          style={{textAlign: 'center'}}
                                                          key={i}>You must select at least one day.
                                                       </p> : undefined;

    return (
      <div>
        <Modal.Body>
          <div className="pickup-form-week">
            { days }
          </div>
          <div className="day-input-container">
            { this._renderSelectDayValidation(dayInputs) }
            { dayInputs }
          </div>
          {dayValidation}
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
  initData : React.PropTypes.object.isRequired,
  nextStep : React.PropTypes.func.isRequired,
  prevStep : React.PropTypes.func.isRequired,
};
