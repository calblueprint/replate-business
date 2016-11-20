/**
 * @prop pickup_id - id associated with the current pickup
 * @prop initData  - saved data associated with the recurrence portion of the pickup form
 * @prop nextStep  - function handler to move on to next step of pickup creation
 * @prop prevStep  - function handler to move back to prev step of pickup creation
 */
class RecurrenceForm extends DefaultForm {

  constructor(props) {
    super(props);
    if (jQuery.isEmptyObject(this.props.initData)) {
      let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
        this.state[day] = {
                           active: false,
                           input: {},
                          };
      });
    } else {
      this.state = this.props.initData;
    }
  }

  _toggleDay = (day) => {
    this.setState({ [day]: { active: !this.state[day].active,
                             input: this.state[day].input } });
  }

  _capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _nextStep = (e) => {
    this.props.nextStep(this.state, "recurrenceForm");
  }

  _prevStep = (e) => {
    this.props.prevStep(this.state);
  }

  _updateState = (key, value, day) => {
    let newState = React.addons.update(this.state, { [day]: { input: { [key]: { $set: value } } }
    });
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

    let day_inputs = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      return (this.state[day].active ? <RecurrenceDayInput
                                         day      = {day}
                                         update   = {this._updateState}
                                         initData = {this.state[day].input}
                                         key      = {i} />
                                     : undefined)
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
            {day_inputs}
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
  pickup_id : React.PropTypes.number.isRequired,
};
