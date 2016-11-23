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
        <label htmlFor={name}>{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name} />
      </fieldset>
    )
  }

  render() {
    return (
      <div>
        { this._renderInputField("company_name",
                                 "Company Name",
                                 "text",
                                 "Your Awesome Company") }
        { this._renderInputField("business_email",
                                 "Email",
                                 "email",
                                 "example@business.com") }
        { this._renderInputField("company_name",
                                 "Company Name",
                                 "text",
                                 "Your Awesome Company") }
        { this._renderInputField("company_name",
                                 "Company Name",
                                 "text",
                                 "Your Awesome Company") }
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
