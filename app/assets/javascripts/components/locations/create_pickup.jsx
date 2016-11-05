/**
 * @prop location_id - id associated with the current location
 * @prop success     - function handler for successful student creation
 */
class PickupCreationModal extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { location_id      : this.props.location_id,
                   step             : 1,
                   basicForm        : {},
                   recurrenceForm   : {},
                   confirmationForm : {},
                 };
  }

  _attemptCreate = (initData) => {
    const success = (data) => {
      this.props.success();
      this.close();
      this.setState({ basicForm: {} });
      this.setState({ step: 1 });
    }
    this.state.basicForm = initData;
    this.state.basicForm.location_id = this.state.location_id;
    this._attemptAction(APIConstants.pickups.create, this.state.basicForm, success, success);
  }

  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  _nextStep = (data, key) => {
    if (data && key){
      this.setState({ [key]: data });
    }
    this.setState({ step: this.state.step + 1 });
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
                  nextStep = {this._nextStep} />
      case 2:
        return <RecurrenceForm
                  initData = {this.state.recurrenceForm}
                  nextStep = {this._nextStep}
                  prevStep = {this._prevStep} />
      case 3:
        return <ConfirmationForm
                  initData      = {this.state.basicForm}
                  prevStep      = {this._prevStep}
                  attemptCreate = {this._attemptCreate} />
    }
  }

  render() {
     let step = this._getStep();

    return (
      <div className="pickup-form-container">
        <button onClick={this.open} type="button" className="submit-button-o button-small">
          <span className="fa fa-plus" />
          Create a new pickup
        </button>
        <Modal show={this.state.showModal} onHide={this.close}>
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
