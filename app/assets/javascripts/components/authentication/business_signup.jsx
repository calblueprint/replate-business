/**
 * Component for Business Signup
 * @prop save - callback function to save business data to parent
 */
class BusinessSignup extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderInputField = (name, label, inputType, placeholder) => {
    return (
      <fieldset className="input-container">
        <label htmlFor={name} className="label--newline">{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name}
          onChange={this._handleChange} value={this.state[name]}/>
      </fieldset>
    )
  }

  _saveBusinessData = () => {
    const data = this._formFields();
    this.props.save(data);
  }

  render() {
    return (
      <div>
        <h2>Basic Information</h2>
        { this._renderInputField("company_name", "Company Name", "text", "Your Awesome Company") }
        { this._renderInputField("phone", "Phone", "text", "(123) 456-7890") }
        { this._renderInputField("email", "Email", "email", "example@business.com") }
        { this._renderInputField("password", "Password", "password") }
        { this._renderInputField("password_confirmation", "Confirm Password", "password") }

        <button className="button"
          onClick={this._saveBusinessData}>Continue</button>
      </div>
    );
  }
}
