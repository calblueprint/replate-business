/**
 * @prop basicData      - saved data associated with the basic portion of the pickup form
 * @prop recurrenceData - saved data associated with the basic portion of the pickup form
 * @prop prevStep       - function handler to move back to prev step of pickup creation
 * @prop attemptCreate  - function handler for creating Pickups and Recurrences
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class ConfirmationForm extends DefaultForm {

  constructor(props) {
    super(props);
  }

  _prevStep = (e) => {
    this.props.prevStep();
  }

  _attemptCreate = (e) => {
    this.props.attemptCreate();
  }

  _frequencyToWords = (n) => {
    if (n == 0) {
      return "One Time Pickup";
    } else {
      return "Recurring Pickup"
    }
  }

  render() {
    let recurrences = DAYSOFWEEK.map((day, i) => {
      if (this.props.recurrenceData[day].active) {
        pickupTimeWindow = this.props.recurrenceData[day].input.start_time + "-" + this.props.recurrenceData[day].input.end_time;
        return <div className="name-container confirmation-container" key={i}>
                  <h3 className="confirmation label">{this._capitalize(day)}</h3>
                  <div className="confirmation info-row">
                    <h3 className="label">Time Window</h3>
                    <h3 className="label">Start Date</h3>
                    <h3 className="label">Frequency</h3>
                 </div>
                 <div className="confirmation info-row">
                    {pickupTimeWindow}
                    {this.props.recurrenceData[day].input.start_date_display}
                    {this._frequencyToWords(this.props.recurrenceData[day].input.frequency)}
                 </div>
              </div>
      }
    });
    return (
      <div>
        <Modal.Body>
          <div>
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Title</h3>
              <p>{this.props.basicData.title}</p>
            </div>
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Comments</h3>
              <p>{this.props.basicData.comments}</p>
            </div>
            {recurrences}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button name="submit" value="Previous Step"
            className="button button--text-black marginRight-xxs"
            onClick={this._prevStep}>
            <span className="fa fa-angle-left marginRight-xxs"></span>
            Back
          </button>
          <button type="submit" name="submit" value="Create Pickup"
            className="button"
            onClick={this._attemptCreate}>Create Pickup</button>
        </Modal.Footer>
      </div>
    );
  }
}


ConfirmationForm.propTypes = {
  basicData          : React.PropTypes.object.isRequired,
  recurrenceData     : React.PropTypes.object.isRequired,
  prevStep           : React.PropTypes.func.isRequired,
  attemptCreate      : React.PropTypes.func.isRequired,
};
