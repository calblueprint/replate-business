/**
 * @prop basicData      - saved data associated with the basic portion of the pickup form
 * @prop recurrenceData - saved data associated with the basic portion of the pickup form
 * @prop prevStep       - function handler to move back to prev step of pickup creation
 * @prop handleUpdates  - function handler for creating/updating Pickups and Recurrences
 * @prop isEdit         - boolean indicating whether pickup is being edited 
 * @prop setLoading     - function to set loading boolean in parent
 * @prop loading        - boolean indicating whether page is being loaded
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class ConfirmationForm extends DefaultForm {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading != this.state.loading) {
      this.state.loading = nextProps.loading;
    }
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

  _pickupAction = (e) => {
    this.props.setLoading(true);
    this.props.handleUpdates(e);
  }

  render() {
    let loadingContainer;
    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    let recurrences = DAYSOFWEEK.map((day, i) => {
      if (this.props.recurrenceData[day].active) {
        let startTime = moment(this.props.recurrenceData[day].input.start_time, "hh:mm:A").format("h:mm A");
        let endTime = moment(this.props.recurrenceData[day].input.end_time, "hh:mm:A").format("h:mm A");
        let pickupTimeWindow = startTime + " - " + endTime;
        return <div className="confirmation-container info-row--around" key={i}>
                  <h3 className="confirmation label">{this._capitalize(day)}</h3>
                  <div className="label-container">
                    {pickupTimeWindow}
                  </div>
              </div>
      }
    });
    return (
      <div>
        {loadingContainer}
        <Modal.Body>
          <div className="info-row--between">
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Title</h3>
              <p>{this.props.basicData.title}</p>
            </div>
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Frequency</h3>
              <p>{this.props.basicData.frequency === "one_time" ? "One Time" : "Weekly"}</p>
            </div>
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">{this.props.basicData.frequency === "weekly" ? "Start Date" : "Pickup Date"}</h3>
              <p>{this.props.basicData.start_date_display}</p>
            </div>
          </div>
          <div>
            {recurrences}
            <div className="confirmation-container name-container">
              <h3 className="confirmation label">Comments</h3>
              <p>{this.props.basicData.comments ? this.props.basicData.comments : `No comments`}</p>
            </div>
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
            onClick={this._pickupAction}>{this.props.isEdit ? `Update Pickup` : `Create Pickup`}</button>
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
