/**
 * @prop day         - String day associated with day input
 * @prop update      - function for updating day input state in parent
 * @prop initData    - saved data associated with this day input
 * @prop validations - object containing validation messages
 */
class RecurrenceDayInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    this.state.day = this.props.day;
    if (!this.state.start_time) {
      this.state.start_time = "09:00 AM"; // Default to midnight
    }
    this.state.validations = {};
    if (this.props.validations) {
      this.state.validations = this.props.validations;
    }
  }

  _updateState = (e) => {
    this._handleChange(e);
    let target = $(e.target);
    this.props.update(target.attr('name'), target.val(), this.state.day);
  }

  _oneTimePickup = (e) => {
    this.setState({frequency : 0});
    this.props.update('frequency', 0, this.state.day);
  }

  _recurringPickup = (e) => {
    this.setState({frequency : 1});
    this.props.update('frequency', 1, this.state.day);
  }

  render() {
    if (this.props.validations) {
      this.state.validations = this.props.validations;
    }
    let pickupTypeBtns = ["One Time Pickup", "Recurring Pickup"].map((title, i) => {
      if (this.state.frequency == undefined ||
         (this.state.frequency == 0 && title == "Recurring Pickup") ||
         (this.state.frequency == 1 && title == "One Time Pickup")) {
        return <div className="pickup-type-btn pickup-btn-inactive"
                    onClick={title == "One Time Pickup" ? this._oneTimePickup : this._recurringPickup}
                    key={i}>{title}</div>
      } else {
        return <div className="pickup-type-btn pickup-btn-active"
                    onClick={title == "One Time Pickup" ? this._oneTimePickup : this._recurringPickup}
                    key={i}>{title}</div>
      }
    });
    return (
      <div className="day-input-container">
      <label>{this._capitalize(this.state.day)}</label>
        <form className="day-input-form">
          <fieldset className="input-container name-container">
            <label>Pickup Type</label>
            {pickupTypeBtns}
            {this.state.validations.frequency}
          </fieldset>

          <TimeInput
            label = "Pickup Time"
            input_id = "start"
            form_name = "start_time"
            update = {this._updateState}
            initData = {this.state.start_time} />
            {this.state.validations.start_time}

          <fieldset className="input-container name-container">
            <label>Start Pickups on</label>
            <input type="datetime-local" defaultValue={this.state.start_date} ref="focus" name="start_date" onChange={this._updateState} />
            {this.state.validations.start_date}
          </fieldset>
        </form>
      </div>
    );
  }
}

RecurrenceDayInput.propTypes = {
  day     : React.PropTypes.string.isRequired,
  initData: React.PropTypes.object.isRequired,
  update  : React.PropTypes.func.isRequired,
};
