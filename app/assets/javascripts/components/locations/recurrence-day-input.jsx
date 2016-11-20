/**
 * @prop day      - String day associated with day input
 * @prop initData - saved data associated with this day input
 * @prop update   - function for updating day input state in parent
 */
class RecurrenceDayInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _updateState = (e) => {
    this._handleChange(e);
    let target = $(e.target);
    this.props.update(target.attr('name'), target.val(), this.props.day);
  }

  render() {
    return (
      <div>
        <form className="day-input-form">
          <TimeInput label = "Start Time"
                     input_id = "start"
                     form_name = "start_time"
                     update = {this._updateState}
                     initData = {this.state.start_time} />

          <TimeInput label = "End Time"
                     input_id = "end"
                     form_name = "end_time"
                     update = {this._updateState}
                     initData = {this.state.end_time} />

          <fieldset className="input-container name-container">
            <label>How often?</label>
            <select defaultValue={this.state.frequency} name="frequency" onChange={this._updateState}>
              <option value="" disabled selected>Add a recurrence</option>
              <option value="1">Every week</option>
              <option value="2">Every other week</option>
              <option value="4">Every month</option>
            </select>
          </fieldset>

          <fieldset className="input-container name-container">
            <label>Start Pickups on</label>
            <input type="datetime-local" defaultValue={this.state.start_date} ref="focus" name="start_date" onChange={this._updateState} />
          </fieldset>
        </form>
      </div>
    );
  }
}

RecurrenceDayInput.propTypes = {
  day     : React.PropTypes.string.isRequired,
  update  : React.PropTypes.func.isRequired,
};
