/**
 * Component for Business Signup
 *
 */
class SignupForm extends DefaultForm {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SignupBusinessForm />
        <SignupLocationForm />
      </div>
    );
  }
}

/**
 * Initial Business creation form during signup
 *
 */
class SignupBusinessForm extends DefaultForm {

  constructor(props) {
    super(props);

    this.state = {};
  }

  _renderInputField = (name, label, inputType, placeholder) => {
    return (
      <fieldset className="input-container">
        <label htmlFor={name} className="label--newline">{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name} onChange={this._handleChange} />
      </fieldset>
    )
  }

  _attemptCreate = () => {
    this._attemptAction(APIConstants.sessions.signup,
      { business: this._formFields() });

    console.log(this.state)
  }

  render() {
    return (
      <div>
        { this._renderInputField("company_name",
                                 "Company Name",
                                 "text",
                                 "Your Awesome Company") }
        { this._renderInputField("email",
                                 "Email",
                                 "email",
                                 "example@business.com") }
        { this._renderInputField("password",
                                 "Password",
                                 "password") }
        { this._renderInputField("password_confirmation",
                                 "Confirm Password",
                                 "password") }

        <button className="button" onClick={this._attemptCreate}>
          Sign Up
        </button>
      </div>
    );
  }
}


/**
 * Initial location creation form during signup
 *
 */
class SignupLocationForm extends DefaultForm {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>First Location Create</div>
    );
  }
}
