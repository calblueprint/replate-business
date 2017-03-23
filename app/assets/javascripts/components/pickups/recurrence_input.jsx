/**
 * @prop day            - String day associated with day input
 * @prop update         - function for updating day input state in parent
 * @prop initData       - saved data associated with this day input
 **/
var RECURRENCEFIELDS = ["One Time Pickup", "Recurring Pickup"];
class RecurrenceInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    this.state.day = this.props.day;

    if (!this.state.start_time) {
      // Set start_time to 9:00AM by default
      this.state.start_time = "09:00 AM";
    }
  }

  _updateTime = (start_time) => {
      this.state.start_time = start_time;
      this.props.update("start_time", start_time, this.state.day);
  }

  _updateState = (e) => {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this.props.update(target.attr('name'), target.val(), this.state.day);
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
        "one_time" : "One Time Pickup",
        "weekly" : "Recurring Pickup",
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
    // this._validate();

    return (
      <div className="day-input-container">
        <h2 className="pickup-day-title">
          {this._capitalize(this.state.day)}
        </h2>
        <form className="day-input-form">
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
          </div>
        </form>
      </div>
    );
  }
}

RecurrenceInput.propTypes = {
  day          : React.PropTypes.string.isRequired,
  initData     : React.PropTypes.object.isRequired,
  update       : React.PropTypes.func.isRequired,
};
