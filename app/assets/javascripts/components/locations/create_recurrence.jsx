/**
 * @prop request_id - id associated with the current request
 * @prop success    - function handler for successful recurrence creation
 */
class RecurrenceCreationModule extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      monday    : "day-item",
      tuesday   : "day-item",
      wednesday : "day-item",
      thursday  : "day-item",
      friday    : "day-item"
    }
  }

  _toggleDay = (e) => {
    var day = e.target.id;
    if (this.state[day] === "day-item day-active") {
      var val = "day-item";
    } else {
      var val = "day-item day-active";
    }
    var state  = {};
    state[day] = val;
    this.setState( state );
  }

  render() {
    return (
      <div className="action-item create-item recurrence-container">
        <div className="week-container">
          <div className={this.state.monday} id="monday" onClick={this._toggleDay}>Monday</div>
          <div className={this.state.tuesday} id="tuesday" onClick={this._toggleDay}>Tuesday</div>
          <div className={this.state.wednesday} id="wednesday" onClick={this._toggleDay}>Wednesday</div>
          <div className={this.state.thursday} id="thursday" onClick={this._toggleDay}>Thursday</div>
          <div className={this.state.friday} id="friday" onClick={this._toggleDay}>Friday</div>
        </div>
      </div>
    );
  }
}

RecurrenceCreationModule.propTypes = {
  request_id : React.PropTypes.number.isRequired,
  success      : React.PropTypes.func.isRequired
};