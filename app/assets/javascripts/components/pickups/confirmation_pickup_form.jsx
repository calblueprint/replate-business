/**
 * @prop initData      - saved data associated with the basic portion of the pickup form
 * @prop prevStep      - function handler to move back to prev step of pickup creation
 * @prop attemptCreate - function handler for creating Pickups and Recurrences
 */
class ConfirmationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _prevStep = (e) => {
    this.props.prevStep();
  }

  _attemptCreate = (e) => {
    this.props.attemptCreate(this.state);
  }

  render() {
    return (
      <div>
        <Modal.Body>
          <div className="confirmation-container">
            <div className="name-container">
              <h3>Title</h3>
              <p>{this.state.title}</p>
            </div>
            <div className="name-container">
              <h3>Caterer</h3>
              <p>{this.state.caterer}</p>
            </div>
            <div className="name-container">
              <h3>Comments</h3>
              <p>{this.state.comments}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button button--text-alert marginRight-xs pull-left"
            onClick={this.props.close}>Cancel</button>
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
  initData : React.PropTypes.object.isRequired,
  prevStep : React.PropTypes.func.isRequired,
  attemptCreate : React.PropTypes.func.isRequired,
};
