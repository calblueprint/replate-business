/**
 * @prop location_id    - id associated with the current location
 * @prop success        - function handler for successful student creation
 * @prop basicForm      - object containing prepopulated basicForm info
 * @prop recurrenceForm - object containing prepopulated recurrenceForm info
 * @prop showModal      - OPTIONAL boolean for showing and hiding modal
 * @prop setshowModal   - function to set showModal in the parent
 * @prop isEdit         - boolean indicating whether a pickup is being created or edited
 * @prop setIsEdit      - function to set isEdit in the parent
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class PickupModal extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      location_id: this.props.location_id,
      step: 1,
      basicForm: this.props.basicForm,
      recurrenceForm: this.props.recurrenceForm,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.state.showModal) {
      this.setState({ showModal: nextProps.showModal });
    }
    if (nextProps.isEdit !== this.state.isEdit) {
      this.setState({ isEdit: nextProps.isEdit });
      if (!nextProps.isEdit) {
        this.setState({ basicForm: {} });
        this.setState({ recurrenceForm: {} });
      }
    }
    if (nextProps.isEdit) {
      this.setState({ step: 1 });
      this.setState({ basicForm: nextProps.basicForm });
      this.setState({ recurrenceForm: nextProps.recurrenceForm });
    }
  }

  _handleUpdates = (e) => {
    if (this.state.isEdit) {
      this._attemptUpdate();
    } else {
      this._attemptCreate();
    }
  }

  _attemptUpdate = () => {
    const failure = (data) => {
      toastr.error("Please try again or refresh the page.", "Sorry, something went wrong.");
    };
    const recurrenceSuccess = (data) => {
      this.props.success();  //Updates schedule
      this.setState({ step: 1, });
      this.close();
    }

    let days = DAYSOFWEEK.map((day, i) => {
      let recurrence = this.state.recurrenceForm[day];
      let id = recurrence.input.id;
      if (recurrence.active) {
        if (id) { // Patch existing recurrences
          Requester.update(APIConstants.recurrences.update(id),
                           this.state.recurrenceForm[day].input,
                           recurrenceSuccess,
                           failure)
        } else { // Create new recurrences
          recurrence.input.pickup_id = this.state.basicForm.id;
          Requester.post(APIConstants.recurrences.create,
                         this.state.recurrenceForm[day].input,
                         recurrenceSuccess,
                         failure);
        }
      } else {
        if (id) { // Delete anything that has been updated to inactive 
          Requester.delete(APIConstants.recurrences.update(id),
                           recurrenceSuccess,
                           failure);
        }
      }
    });
  }

  _attemptCreate = () => {
    const pickupSuccess = (data) => {
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
      this.props.success();  //Updates schedule
      this.setState({ step: 1, });
      this.close();
    }

    const failure = (data) => {
      toastr.error("Please try again or refresh the page.", "Sorry, something went wrong.");
    }; // do not clear form

    this.state.basicForm.location_id = this.state.location_id;
    this._attemptAction(APIConstants.pickups.create,
                        this.state.basicForm,
                        pickupSuccess,
                        failure);
  }

  open = (e) => {
    this.props.setIsEdit(false);
    this.props.setShowModal(true);
  }

  close = (e) => {
    this.props.setShowModal(false);
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
        return <BasicForm
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
                  handleUpdates  = {this._handleUpdates} 
                  isEdit         = {this.state.isEdit}/>
    }
  }

  render() {
     let step = this._getStep();
    return (
      <div className="pickup-form-container">
        <button visibility={this.state.isEdit ? `hidden` : ``} onClick={this.open} type="button" className="button">
          <span className="fa fa-plus marginRight-xxs" />
          Create a new pickup
        </button>
        <Modal show={this.state.showModal} onHide={this.close}
          className="pickup-creation-modal">
          <Modal.Header>
            <h1 className="modal-title">{this.props.isEdit ? `Edit Pickup` : `Schedule New Pickup`}</h1>
          </Modal.Header>
          {step}
        </Modal>
      </div>
    );
  }
}

PickupModal.propTypes = {
  location_id : React.PropTypes.number.isRequired,
  success     : React.PropTypes.func.isRequired,
};
