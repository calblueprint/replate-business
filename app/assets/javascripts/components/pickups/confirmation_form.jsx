/**
 * @prop basicData      - saved data associated with the basic portion of the pickup form
 * @prop recurrenceData - saved data associated with the basic portion of the pickup form
 * @prop prevStep       - function handler to move back to prev step of pickup creation
 * @prop handleUpdates  - function handler for creating/updating Pickups and Recurrences
 * @prop isEdit         - boolean indicating whether pickup is being edited 
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class ConfirmationForm extends DefaultForm {

  constructor(props) {
    super(props);
  }

  _prevStep = (e) => {
    this.props.prevStep(this.props.basicData.frequency);
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
                  <h3 className="label">Time Window</h3>
                  {pickupTimeWindow}
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
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Frequency</h3>
              <p>{this.props.basicData.frequency === "one_time" ? "One Time" : "Weekly"}</p>
            </div>
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">{this.props.basicData.frequency === "weekly" ? "Start Date" : "Pickup Date"}</h3>
              <p>{this.props.basicData.start_date_display}</p>
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
            onClick={this.props.handleUpdates}>{this.props.isEdit ? `Update Pickup` : `Create Pickup`}</button>
        </Modal.Footer>
      </div>
    );
  }
}


ConfirmationForm.propTypes = {
  basicData          : React.PropTypes.object.isRequired,
  recurrenceData     : React.PropTypes.object.isRequired,
  prevStep           : React.PropTypes.func.isRequired,
  handleUpdates      : React.PropTypes.func.isRequired,
};
