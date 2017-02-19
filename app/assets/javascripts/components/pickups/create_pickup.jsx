/**
 * @prop location_id - id associated with the current location
 * @prop success     - function handler for successful student creation
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class PickupCreationModal extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      location_id: this.props.location_id,
      step: 1,
      basicForm: {},
      recurrenceForm: {},
    };
  }

  _attemptCreate = (initData) => {
    const pickupSuccess = (data) => {
      this.close();
      this.setState({
        pickupId: data.message.id,
     });
      let days = DAYSOFWEEK.map((day, i) => {
        if (this.state.recurrenceForm[day].active) {
          this.state.recurrenceForm[day].input.pickup_id = this.state.pickupId;
          this._attemptAction(APIConstants.recurrences.create,
                              this.state.recurrenceForm[day].input,
                              recurrenceSuccess,
                              failure);
        }
      });
    }
    const recurrenceSuccess = (data) => {
      console.log("RECURRENCESUCCESS!!");
      this.props.success();  //Updates schedule
      this.setState({
        basicForm: {},
        recurrenceForm: {},
        step: 1,
      });
    }

    const failure = (data) => {}; // do not clear form

    this.state.basicForm.location_id = this.state.location_id;
    this._attemptAction(APIConstants.pickups.create,
                        this.state.basicForm,
                        pickupSuccess,
                        failure);
  }

  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  _nextStep = (data, key, validated) => {
    if (data && key){
      this.setState({ [key]: data });
    }
    if (validated) {
      this.setState({ step: this.state.step + 1 });
    }
  }

  _prevStep = (data, key) => {
    this.setState({ [key]: data });
    this.setState({ step: this.state.step - 1 });
  }

  _getStep = () => {
    switch (this.state.step) {
      case 0:
        return "";
      case 1:
        return <BasicPickupForm
                  initData = {this.state.basicForm}
                  nextStep = {this._nextStep}
                  close    = {this.close} />
      case 2:
        return <RecurrenceForm
                  initData = {this.state.recurrenceForm}
                  nextStep = {this._nextStep}
                  prevStep = {this._prevStep}
                  close    = {this.close} />
      case 3:
        return <ConfirmationForm
                  basicData      = {this.state.basicForm}
                  recurrenceData = {this.state.recurrenceForm}
                  prevStep       = {this._prevStep}
                  attemptCreate  = {this._attemptCreate} />
    }
  }

  render() {
     let step = this._getStep();

    return (
      <div className="pickup-form-container">
        <button onClick={this.open} type="button" className="button">
          <span className="fa fa-plus marginRight-xxs" />
          Create a new pickup
        </button>
        <Modal show={this.state.showModal} onHide={this.close}
          className="pickup-creation-modal">
          <Modal.Header>
            <h1 className="modal-title">Schedule New Pickup</h1>
          </Modal.Header>
          {step}
        </Modal>
      </div>
    );
  }
}

PickupCreationModal.propTypes = {
  location_id : React.PropTypes.number.isRequired,
  success     : React.PropTypes.func.isRequired,
};
