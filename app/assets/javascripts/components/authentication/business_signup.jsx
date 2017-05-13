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

  _addRedBorder = (input, className) => {
    input.parentNode.classList.add(className);
    input.classList.add("red-border");
  }

  _removeRedBorder = (input, className) => {
    input.parentNode.classList.remove(className);
    input.classList.remove("red-border");
  }

  _validateEmail = (input) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
  }

  _saveBusinessData = () => {
    var error = false;
    const data = this._formFields();
    if (!('company_name' in data) || !(data.company_name)) {
      this._addRedBorder(document.getElementById('company_name'),"blank");
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('company_name'),"blank");
    }
  
    if (!('email' in data) || !(data.email)) {
      this._addRedBorder(document.getElementById('email'),"blank");
      error = true;
    }
    else {
      var isValid = this._validateEmail(data.email);
      if (!isValid) {
        this._addRedBorder(document.getElementById('email'),"invalid");
        error = true;
      }
      else {
        this._removeRedBorder(document.getElementById('email'),"blank");
        this._removeRedBorder(document.getElementById('email'),"invalid");
      }
    }
    if ((!('password' in data)) || (!(data.password))) {
      this._addRedBorder(document.getElementById('password'),"blank");
      error = true;
    }
    
    else {
      if (data.password.length < 8) {
        this._addRedBorder(document.getElementById('password'),"short");
        error = true;
      }
      else {
        this._removeRedBorder(document.getElementById('password'),"short");
        this._removeRedBorder(document.getElementById('password'),"blank");
      }
    }
    if (!('password_confirmation' in data) || !(data.password_confirmation)) {
      this._addRedBorder(document.getElementById('password_confirmation'),"blank");
      error = true;
    }
    else {
      this._removeRedBorder(document.getElementById('password_confirmation'),"blank");
    }
    if (!('phone' in data) || !(data.phone)) {
      this._addRedBorder(document.getElementById('phone'),"blank");
      error = true;
    }
    else {
      if (data.phone.length < 12) { // 12 because there are dashes in the phone number
        this._addRedBorder(document.getElementById('phone'),"phone_short");
        error = true;
      }
      else {
        this._removeRedBorder(document.getElementById('phone'),"phone_short");
        this._removeRedBorder(document.getElementById('phone'),"blank");
      }      
    }
    if (data.password != data.password_confirmation || !data.password || !data.password_confirmation) {  
      var confirm = document.getElementById('password_confirmation');
      this._addRedBorder(confirm,"nomatch");
      error = true;
    }
    else {
      var confirm = document.getElementById('password_confirmation');
      this._removeRedBorder(confirm,"nomatch");
    }

    if (this.state.agreeTOS) {
      this.setState({ tosAlert: false, })
      
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
