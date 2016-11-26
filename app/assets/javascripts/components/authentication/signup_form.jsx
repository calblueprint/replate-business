/**
 * Component for Business Signup
 *
 */
class SignupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      view: 1,
      businessID: null,
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

  _onBusinessCreate = (id) => {
    console.log(id);
    this.setState({
      view: 2,
      businessID: id.data,
    });
  }

  _onSuccessfulSignup = () => {
    window.location = "/dashboard";
  }


  render() {
    let renderedForm;

    if (this.state.view == 1) {
      renderedForm = <BusinessSignup success = {this._onBusinessCreate}/>
    } else {
      renderedForm = <LocationSignup businessID = {this.state.businessID}
                                     success = {this._onSuccessfulSignup} />
    }

    return (
      <div>
        {renderedForm}
      </div>
    );
  }
}
