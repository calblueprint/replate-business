/**
 * @prop day         - String day associated with day input
 * @prop update      - function for updating day input state in parent
 * @prop initData    - saved data associated with this day input
 * @prop validations - object containing validation messages
 */
var STARTTIME = "09:00 AM";
var RECURRENCEFIELDS = ["One Time Pickup", "Recurring Pickup"];
class RecurrenceDayInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    this.state.day = this.props.day;
    if (!this.state.start_time) {
      this.state.start_time = STARTTIME; // Default to 9AM
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

  _setOneTimePickup = (e) => {
    this.setState({frequency : 0});
    this.props.update('frequency', 0, this.state.day);
  }

  _setRecurringPickup = (e) => {
    this.setState({frequency : 1});
    this.props.update('frequency', 1, this.state.day);
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
    if (this.props.validations) {
      this.state.validations = this.props.validations;
    }

    return (
      <div className="day-input-container">
        <h2 className="pickup-day-title">
          {this._capitalize(this.state.day)}
        </h2>
        <form className="day-input-form">
          <fieldset className="input-container">
            <label className="label marginRight-lg">Frequency</label>
            {this._renderPickupTypeButtons()}
            {this.state.validations.frequency}
          </fieldset>

          <div className="row marginTop-sm">
            <div className="col-md-6">
              <TimeInput
                label = "Pickup Time"
                input_id = "start"
                form_name = "start_time"
                update = {this._updateState}
                initData = {this.state.start_time} />
                {this.state.validations.start_time}
            </div>
            <div className="col-md-6">
              <fieldset className="input-container">
                <label className="label label--newline">Start Date</label>
                <input type="text" data-provide='datepicker' data-date-start-date="today" defaultValue={this.state.start_date_display}
                  name="start_date_display" onSelect={this._updateState}
                  className="input" placeholder="Click to select a day" />
                {this.state.validations.start_date}
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
