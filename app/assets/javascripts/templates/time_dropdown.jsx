/**
 * Component to format time inputs
 * @prop label     - Label for time input element
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
    let target = $(e.target);
    let time = ("0" + target.val()).slice(-2);
    this.state[target.attr('name')] = time;
    let timeStr = this.state.hour + ":" + this.state.minute + " " + this.state.meridiem;
    this.props.update(timeStr);
  }

  render() {
    let minuteOptions = [];
    for (let i = 0; i < 60; i += 5) {
      let minuteStr = ("0" + i).slice(-2);
      let select = minuteStr === this.state.minute;
      let minuteOption = <option value={i} key={i} selected={select ? "selected" : ""}>{minuteStr}</option>
      minuteOptions.push(minuteOption);
    }

    let hourOptions = [];
    for (let i = 1; i <= 12; i += 1) {
      let hourStr = ("0" + i).slice(-2);
      let select = hourStr === this.state.hour;
      let hourOption = <option value={i} key={i} selected={select ? "selected" : ""}>{hourStr}</option>
      hourOptions.push(hourOption);
    }

    let meridiemOptions = ["AM", "PM"].map((meridiem, i) => {
      let select = meridiem === this.state.meridiem;
      let meridiemOption = <option value={meridiem} key={i} selected={select ? "selected" : ""}>{meridiem}</option>
      return meridiemOption;
    });

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
        <select className="select" name="meridiem" onChange={this._handleInput}>
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
