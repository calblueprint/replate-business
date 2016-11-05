/**
 * @prop pickup_id - id associated with the current pickup
 * @prop success    - function handler for successful recurrence creation
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop prevStep - function handler to move back to prev step of pickup creation
 */
class RecurrenceForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      monday    : false,
      tuesday   : false,
      wednesday : false,
      thursday  : false,
      friday    : false,
      active    : {},
    }
    // let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day)) => {
    //   let state  = {};
    //   state[day] = !this.state[day];
    //   this.setState( state );
    // }
  }

  _toggleDay = (day) => {
    let state  = {};
    state[day] = !this.state[day];
    this.setState( state );
  }

  _capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _nextStep = (e) => {
    this.props.nextStep(this.state);
  }

  _prevStep = (e) => {
    this.props.prevStep(this.state);
  }

  // _generateDaySelection => {

  // }

  render() {

    let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      return <div className={`day-item day-` + (this.state[day] ? "active" : "inactive")}
                  onClick={this._toggleDay.bind(this, day)}
                  key={i} >
                  {this._capitalize(day)}
      </div>
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
          <div className="day-selection-container">
            {this.state.daySelections}
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
  success    : React.PropTypes.func.isRequired
};
