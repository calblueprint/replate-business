/**
 * @prop request_id - id associated with the current request
 * @prop success    - function handler for successful recurrence creation
 */
class RecurrenceCreationModule extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      monday    : false,
      tuesday   : false,
      wednesday : false,
      thursday  : false,
      friday    : false
    }
  }

  _toggleDay = (day) => {
    let state  = {};
    state[day] = !this.state[day];
    this.setState( state );
  }

  _capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {

    let days = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day, i) => {
      return <div className={`day-item day-` + (this.state[day] ? "active" : "inactive")}
                  onClick={this._toggleDay.bind(this, day)}
                  key={i} >
                  {this._capitalize(day)}
      </div>
    });

    return (
      <div className="action-item create-item recurrence-container">
        <div className="week-container">
          {days}
        </div>
      </div>
    );
  }
}

RecurrenceCreationModule.propTypes = {
  request_id : React.PropTypes.number.isRequired,
  success    : React.PropTypes.func.isRequired
};
