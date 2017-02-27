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

  _addRedBorder = (input) => {
    input.parentNode.classList.add("blank");
    input.classList.add("red-border");
  }

  _removeRedBorder = (input) => {
    input.parentNode.classList.remove("blank");
    input.classList.remove("red-border");
  }

  _saveBusinessData = () => {
    var error = false;
    const data = this._formFields();
    console.log(data);
    if (!('company_name' in data) || !(data.company_name)) {
      this._addRedBorder(document.getElementById('company_name'));
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('company_name'));
    }
  
    if (!('email' in data) || !(data.email)) {
      this._addRedBorder(document.getElementById('email'));
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('email'));
    }
    if (!('password' in data) || !(data.password)) {
      this._addRedBorder(document.getElementById('password'));
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('password'));
    }
    if (!('password_confirmation' in data) || !(data.password_confirmation)) {
      this._addRedBorder(document.getElementById('password_confirmation'));
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('password_confirmation'));
    }
    if (!('phone' in data) || !(data.phone)) {
      this._addRedBorder(document.getElementById('phone'));
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('phone'));
    }
    if (data.password != data.password_confirmation || !data.password || !data.password_confirmation) {  
      var confirm = document.getElementById('password_confirmation');
      confirm.parentNode.classList.add("nomatch");
      confirm.classList.add("red-border");
      error = true;
    }
    else {
      var confirm = document.getElementById('password_confirmation');
      confirm.parentNode.classList.remove("nomatch");
      confirm.classList.remove("red-border");
    }
    if (this.state.agreeTOS) {
      this.setState({ tosAlert: false, })
      
      console.log(data);
      
      
      if (!error) {
        this.props.save(data);
      }
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
        <PhoneInput form_name = "phone"
                    input_id  = "phone"
                    change    = { this._handleChange } />
        { this._renderInputField("email", "Email", "email", "example@business.com") }
        { this._renderInputField("password", "Password", "password") }
        { this._renderInputField("password_confirmation", "Confirm Password", "password") }
        <div>
          <input type="checkbox" id="tos-agree"
            className="marginRight-xs marginTop-md"
            checked={this.state.agreeTOS}
            onChange={this._toggleTerms}/>
          <label htmlFor="tos-agree">
            I agree to the Re-Plate <a href="/terms" target="_blank">Terms of Use and Privacy Policy</a>
          </label>
          {tosAlert}
        </div>
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
