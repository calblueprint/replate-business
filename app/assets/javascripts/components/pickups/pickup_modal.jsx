/**
 * @prop location_id    - id associated with the current location
 * @prop success        - function handler for successful student creation
 * @prop basicForm      - object containing prepopulated basicForm info
 * @prop recurrenceForm - object containing prepopulated recurrenceForm info
 * @prop showModal      - OPTIONAL boolean for showing and hiding modal
 * @prop hideEditModal  - OPTIONAL function for hiding modal
 * @prop isEdit         - boolean indicating whether a pickup is being created or edited
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
      showModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdit) {
      this.state.step = 1;
      this.state.basicForm = nextProps.basicForm;
      this.state.recurrenceForm = nextProps.recurrenceForm;
      if (nextProps.showModal !== this.state.showModal) {
        this.setState({ showModal: nextProps.showModal });
      }
    }
  }

  _handleUpdates = (e) => {
    if (this.props.isEdit) {
      this._attemptUpdate();
    } else {
      this._attemptCreate();
    }
  }

  _attemptUpdate = () => {
    const failure = (data) => {
      toastr.error("Please try again or refresh the page.", "Sorry, something went wrong.");
    };

    const pickupSuccess = (data) => {};

    const recurrenceSuccess = (data) => {
      this.props.success();  //Updates schedule
      this.setState({ step: 1, });
      this.close();
    };

    let days = DAYSOFWEEK.map((day, i) => {
      let recurrence = this.state.recurrenceForm[day];
      let id = recurrence.input ? recurrence.input.id : false;
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

    Requester.update(APIConstants.pickups.update(this.state.basicForm.id),
                           this.state.basicForm,
                           pickupSuccess,
                           failure)
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
      this.setState({ step: 1, 
                      basicForm: {},
                      recurrenceForm: {},
                  });
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
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
    if (this.props.hideEditModal) {
      this.props.hideEditModal();
    }
  }

  _nextStep = (data, key, validated, frequency) => {
    if (data && key){
      this.setState({ [key]: data });
    }
    if (validated) {
      if (key === "basicForm" && frequency && frequency === "one_time") {
        this.setState({ step: this.state.step + 2 });
      }
      else {
        this.setState({ step: this.state.step + 1 });
      }
    }
  }

  _prevStep = (frequency) => {
    if (frequency && frequency === "one_time") {
      this.setState({ step: this.state.step - 2 });
    } else {
      this.setState({ step: this.state.step - 1 });
    }
  }

  _getStep = () => {
    switch (this.state.step) {
      case 0:
        return "";
      case 1:
        return <BasicForm
                  initData = {this.state.basicForm}
                  nextStep = {this._nextStep}
                  isEdit   = {this.props.isEdit}
                  close    = {this.close} />
      case 2:
        return <RecurrenceForm
                  initData   = {this.state.recurrenceForm}
                  basicData  = {this.state.basicForm}
                  nextStep   = {this._nextStep}
                  prevStep   = {this._prevStep}
                  close      = {this.close} />
      case 3:
        return <ConfirmationForm
                  basicData      = {this.state.basicForm}
                  recurrenceData = {this.state.recurrenceForm}
                  prevStep       = {this._prevStep}
                  isEdit         = {this.props.isEdit}
                  handleUpdates  = {this._handleUpdates} />
    }
  }

  render() {
    let step = this._getStep();
    return (
      <div className="pickup-form-container" hidden={this.props.isEdit}>
        <button onClick={this.open} type="button" className="button">
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
