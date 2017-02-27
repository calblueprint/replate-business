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
      this.state[target.attr('name')] = time;
    }

    if (9 <= this.state.hour  && this.state.hour <= 11) {
      this.state.meridiem = "AM";
    } else {
      this.state.meridiem = "PM";
    }

    if (this.state.hour == 5 && this.state.meridiem == "PM") {
        this.state.minute = "00";
    }

    let timeStr = this.state.hour + ":" + this.state.minute + " " + this.state.meridiem;
    this.props.update(timeStr);
  }

  render() {

    let meridiemOptions = ["AM", "PM"].map((meridiem, i) => {
      let select = meridiem === this.state.meridiem;
      let meridiemOption = <option value={meridiem} key={i} selected={select ? "selected" : ""}>{meridiem}</option>
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
      let minuteOption = <option value={i} key={i} selected={select ? "selected" : ""}>{minuteStr}</option>
      minuteOptions.push(minuteOption);
    }

    let hourOptions = [];
    for (let i = 9; i <= 17; i += 1) {
      let j = i === 12 ? i : i % 12;
      let hourStr = ("0" + j).slice(-2);
      let select = hourStr === this.state.hour;
      let hourOption = <option value={j} key={j} selected={select ? "selected" : ""}>{hourStr}</option>
      hourOptions.push(hourOption);
    }

    return (
      <div className="field input-container">
        <label className="label label--newline" htmlFor={this.props.input_id}>{this.props.label}</label>
        <select className="select" name="hour" onChange={this._handleInput}>
          {hourOptions}
        </select>
        <label>:</label>
        <select className="select" name="minute" onChange={this._handleInput}>
          {minuteOptions}
        </select>
        <select className="select" name="meridiem" disabled="true" onChange={this._handleInput}>
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
