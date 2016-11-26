/**
 * Component for Location creation during signup
 * @prop save - callback function to save location data to parent
 */
class LocationSignup extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      business_id: this.props.businessID,
    };
  }

  _renderInputField = (name, label, inputType, placeholder) => {
    return (
      <fieldset className="input-container">
        <label htmlFor={name} className="label--newline">{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name}
          onChange={this._handleChange} />
      </fieldset>
    )
  }

  _saveLocationData = () => {
    const data = this._formFields();
    this.props.save(data);
  }

  render() {
    return (
      <div>
        <h2>Office Location</h2>
        { this._renderInputField("addr_name", "Office Name", "text", "SF Office") }
        { this._renderInputField("number", "Number", "text") }
        { this._renderInputField("street", "Street", "text") }
        { this._renderInputField("city", "City", "text") }
        { this._renderInputField("state", "State", "text") }
        { this._renderInputField("country","Country", "text") }
        { this._renderInputField("zip","ZIP", "text") }
        <button className="button"
          onClick={this._saveLocationData}>Continue</button>
      </div>
    );
  }
}
