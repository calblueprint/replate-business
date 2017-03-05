/**
 * @prop day            - String day associated with day input
 * @prop update         - function for updating day input state in parent
 * @prop initData       - saved data associated with this day input
 * @prop isNextStep     - boolean indicating whether it is the next step
 * @prop setValidated   - function for updating invalid state in parent
 **/
var RECURRENCEFIELDS = ["One Time Pickup", "Recurring Pickup"];
class RecurrenceDayInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    this.state.day = this.props.day;

    if (!this.state.start_time) {
      // Set start_time to 9:00AM by default
      this.state.start_time = "09:00 AM";
    }
    if (!this.state.start_date_display) {
      this.state.start_date_display = this._getToday();
    }

    this.state.isNextStep = this.props.isNextStep;
  }

  _validate = () => {
    this.state.isNextStep = this.props.isNextStep;
    let requiredKeys = ["frequency"];
    this.props.setValidated(true);
    for (i = 0; i < requiredKeys.length; i++) {
      let requiredKey = requiredKeys[i];
      let invalid = this.state[requiredKey] === undefined || this.state[requiredKey] === "";
      if (this.state.isNextStep && invalid) {
        let validationMsg = this._formatTitle(requiredKey) + " can't be empty.";
        let validation = <p className="validation-msg marginTop-xxs"
                            key={i}>{validationMsg}</p>

        this.state[requiredKey + "Validation"] = validation;
        this.props.setValidated(false);
      } else if (!invalid) {
        delete this.state[requiredKey + "Validation"];
      }
    }
  }

  _updateTime = (start_time) => {
      this.state.start_time = start_time
      this.props.update("start_time", start_time, this.state.day);
  }

  _updateState = (e) => {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this.props.update(target.attr('name'), target.val(), this.state.day);
  }

  _setOneTimePickup = (e) => {
    this.setState({frequency : 0});
    this.props.update('frequency', 0, this.state.day);
  }

  _setRecurringPickup = (e) => {
    this.setState({frequency : 1});
    this.props.update('frequency', 1, this.state.day);
  }

  _getToday = () => {
    return moment().format("MM/DD/YYYY");
  }

  _renderPickupTypeButtons = () => {

    const name = `${this.state.day}-radio`;

    return RECURRENCEFIELDS.map((title, i) => {

      _onClickFunction = () => {
        if (title == "One Time Pickup") {
          this._setOneTimePickup();
        } else {
          this._setRecurringPickup();
        }
      }

      const id = `${this.state.day}-radio-${title}`;

      let freqToTitle = {
        0 : "One Time Pickup",
        1 : "Recurring Pickup",
      };

      return (
        <span key={i} className="pickup-radio-item marginRight-xs">
          <input type="radio" name={name} value={title} id={id}
            onChange={_onClickFunction.bind(this)}
            checked={title == freqToTitle[this.state.frequency] ? "checked" : undefined}/>
          <label htmlFor={id}>{title}</label>
        </span>
      )
    })
  }

  render() {
    this._validate();

    return (
      <div className="day-input-container">
        <h2 className="pickup-day-title">
          {this._capitalize(this.state.day)}
        </h2>
        <form className="day-input-form">
          <fieldset className="input-container">
            <label className="label marginRight-lg">Frequency</label>
            {this._renderPickupTypeButtons()}
            {this.state.frequencyValidation}
          </fieldset>

          <div className="row marginTop-sm">
            <div className="col-md-6">
              <TimeDropdown
                label = "Pickup Time"
                details = "9:00AM - 5:00PM"
                input_id = "start"
                form_name = "start_time"
                update = {this._updateTime}
                initData = {this.state.start_time} />
            </div>
            <div className="col-md-6">
              <fieldset className="input-container">
                <label className="label label--newline">Start Date</label>
                <input type="text" data-provide='datepicker' data-date-start-date={this._getToday()} defaultValue={this.state.start_date_display}
                  name="start_date_display" onSelect={this._updateState}
                  className="input" placeholder="Click to select a day" />
              </fieldset>
            </div>
          </div>
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
