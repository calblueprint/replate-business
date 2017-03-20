/**
 * Component to format time inputs
 * @prop label     - Label for time input element
 * @prop details   - Additional string information to display
 * @prop form_name - Name for integration with Rails form submission
 * @prop input_id  - ID for the HTML input element
 * @prop update    - on change function handler
 * @prop initData  - initial data for maintaining state
 */
class TimeDropdown extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { hour: "09",
                   minute: "00",
                   meridiem: "AM", 
                 };
    if (this.props.initData) {
      this._convertTime(this.props.initData);
    }
  }

  _convertTime = (time) => {
    let full = time.split(" ");
    let meridiem = full[1];
    let numerals = full[0].split(":");
    let hour = numerals[0];
    let minute = numerals[1];
    this.state.hour = hour;
    this.state.minute = minute;
    this.state.meridiem = meridiem;
  }

  _handleInput = (e) => {
    if (e != undefined) {
      let target = $(e.target);
      let time = ("0" + target.val()).slice(-2);
      console.log(target.attr('name'), time);
      this.state[target.attr('name')] = time;
    }

    if (9 <= parseInt(this.state.hour)  && parseInt(this.state.hour) <= 11) {
      this.setState({ meridiem : "AM" });
    } else {
      this.setState({ meridiem : "PM" });
    }

    if (parseInt(this.state.hour) === 5 && this.state.meridiem == "PM") {
      this.setState({ minute : "00" });
    }

    let timeStr = this.state.hour + ":" + this.state.minute + " " + this.state.meridiem;
    this.props.update(timeStr);
  }

  render() {

    let meridiemOptions = ["AM", "PM"].map((meridiem, i) => {
      let select = meridiem === this.state.meridiem;
      let meridiemOption = <option value={meridiem} key={i}>{meridiem}</option>
      return meridiemOption;
    });

    let hi = 60;
    if (this.state.hour == 5 && this.state.meridiem == "PM") {
      hi = 5; 
    }
    let minuteOptions = [];
    for (let i = 0; i < hi; i += 5) {
      let minuteStr = ("0" + i).slice(-2);
      let select = minuteStr === this.state.minute;
      let minuteOption = <option value={minuteStr} key={i}>{minuteStr}</option>
      minuteOptions.push(minuteOption);
    }

    let hourOptions = [];
    for (let i = 9; i <= 17; i += 1) {
      let hour = i % 12 ? i % 12 : 12;
      let hourStr = ("0" + hour).slice(-2);
      let select = hourStr === this.state.hour;
      let hourOption = <option value={hourStr} key={hour}>{hourStr}</option>
      hourOptions.push(hourOption);
    }

    return (
      <div className="field input-container">
        <label className="label label--newline" htmlFor={this.props.input_id}>{this.props.label}</label>
        <select className="select" name="hour" onChange={this._handleInput} value={this.state.hour}>
          {hourOptions}
        </select>
        <label>:</label>
        <select className="select" name="minute" onChange={this._handleInput} value={this.state.minute}>
          {minuteOptions}
        </select>
        <select className="select" name="meridiem" disabled="true" onChange={this._handleInput} value={this.state.meridiem}>
          {meridiemOptions}
        </select>
      </div>
    )
  }
}

TimeDropdown.propTypes = {
  label    : React.PropTypes.string.isRequired,
  form_name: React.PropTypes.string.isRequired,
  input_id : React.PropTypes.string.isRequired,
  update   : React.PropTypes.func.isRequired,
  initData : React.PropTypes.string.isRequired,
};
