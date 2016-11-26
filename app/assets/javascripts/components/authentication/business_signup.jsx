/**
 * Component for Business Signup
 * @prop success - callback function on successful business create
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
          onChange={this._handleChange} />
      </fieldset>
    )
  }

  _attemptCreate = () => {

    const success = (data) => {
      this.props.success(data)
    };

    this._attemptAction(APIConstants.sessions.signup,
      { business: this._formFields() }, success.bind(this));

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

        <button onClick={this._attemptCreate}>Create</button>
      </div>
    );
  }
}
