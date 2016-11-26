/**
 * Initial location creation form during signup
 * @prop businessID - business ID to associate location with
 * @prop success    - callback function on successful create
 *
 */
class LocationSignup extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      business_id: this.props.businessID,
    };
  }

  _attemptCreate = () => {
    const success = () => {
      console.log("success!");
      this.props.success();
    };

    this._attemptAction(APIConstants.locations.create,
      this.state, success.bind(this));
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
        <button onClick={this._attemptCreate}>Continue</button>
      </div>
    );
  }
}
