/**
 * Component for Business Signup
 * @prop save - callback function to save business data to parent
 */
class BusinessSignup extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      agreeTOS: false,
    };
  }

  _renderInputField = (name, label, inputType, placeholder) => {
    return (
      <fieldset className="input-container">
        <label htmlFor={name} className="label label--newline">{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name}
          onChange={this._handleChange} value={this.state[name]}/>
      </fieldset>
    )
  }

  _toggleTerms = (e) => {
    this.setState({
      agreeTOS: !this.state.agreeTOS,
    })
  }

  _saveBusinessData = () => {
    if (this.state.agreeTOS) {
      this.setState({ tosAlert: false, })
      const data = this._formFields();
      this.props.save(data);
    } else {
      this.setState({ tosAlert: true, })
    }
  }

  render() {
    let tosAlert;
    if (this.state.tosAlert) {
      tosAlert =
        <p className="validation-msg marginTop-xxs">
          You must agree to the terms of service!
        </p>
    }

    return (
      <div>
        <div className="marginTop-xl signup-section-title-num">1</div>
        <h2 className="signup-section-title">Basic Information</h2>
        <p className="marginBot-lg">We'll need to collect some basic information about your business.</p>
        { this._renderInputField("company_name", "Company Name", "text", "Your Awesome Company") }
        { this._renderInputField("website_url", "Company Website", "url", "http://company.com") }
        <PhoneInput form_name = "phone"
                    input_id  = "phone"
                    change    = { this._handleChange } />
        { this._renderInputField("email", "Email", "email", "example@business.com") }
        { this._renderInputField("password", "Password", "password") }
        { this._renderInputField("password_confirmation", "Confirm Password", "password") }

        <input type="checkbox" id="tos-agree"
          className="marginRight-xs marginTop-md"
          checked={this.state.agreeTOS}
          onChange={this._toggleTerms}/>
        <label htmlFor="tos-agree">
          I agree to the Re-Plate <a href="/terms" target="_blank">Terms of Use and Privacy Policy</a>
        </label>
        {tosAlert}

        <div className="marginTopBot-xl">
          <button onClick={ () => { window.location = "/" } }
            className="button button--text-alert marginRight-xs">Cancel</button>
          <button className="button signup-btn-right"
            onClick={this._saveBusinessData}>
              Continue
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
        </div>
      </div>
    );
  }
}
