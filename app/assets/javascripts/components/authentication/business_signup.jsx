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
    if (this.state.agreeTOS) {
      this.setState({ tosAlert: false, })
      const data = this._formFields();
      console.log(data);
      var error = false;
      if (!('company_name' in data)) {
        this._addRedBorder(document.getElementById('company_name'));
        error = true;
      }
    
      if (!('email' in data)) {
        this._addRedBorder(document.getElementById('email'));
        error = true;
      }
      if (!('password' in data)) {
        this._addRedBorder(document.getElementById('password'));
        error = true;
      }
      if (!('password_confirmation' in data)) {
        this._addRedBorder(document.getElementById('password_confirmation'));
        error = true;
      }
      if (!('phone' in data)) {
        this._addRedBorder(document.getElementById('phone'));
        error = true;
      }
      if (data.password != data.password_confirmation) {
        var newelement = document.createElement('p');
        var donotmatch = document.createTextNode('Passwords do not match');
        newelement.appendChild(donotmatch);
        newelement.style.color = 'red';
        var parent = document.getElementById('tos-agree').parentNode;
        parent.insertBefore(newelement,document.getElementById('tos-agree'));
        error = true;
      }
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
