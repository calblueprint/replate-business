/**
 * Business profile view and edit
 * @prop business - business model object
 */
class EditForm extends DefaultForm {
  constructor(props) {
    super(props);
    this.state = {
      address:this.props.business.address,
      company_name:this.props.business.company_name,
      website_url: this.props.business.website_url,
      email:this.props.business.email,
      phone:this.props.business.phone,
      id:this.props.business.id,
      editable: false
    }
    this.state.initialstate = {
      address:this.props.business.address,
      company_name:this.props.business.company_name,
      website_url: this.props.business.website_url,
      email:this.props.business.email,
      phone:this.props.business.phone,
      id:this.props.business.id,
      editable: false
    }
  }

  _addRedBorder = (input) => {
    input.parentNode.classList.add("blank");
    input.classList.add("red-border");
  }

  _removeRedBorder = (input) => {
    input.parentNode.classList.remove("blank");
    input.classList.remove("red-border");
  }

  _attemptSave = (e) => {
    const success = (msg) => {
      var keys = Object.keys(this.state);
      for (key of keys) {
        if (key === 'editable')
          continue;
        if (document.getElementsByName(key).length) {
          this._removeRedBorder(document.getElementsByName(key)[0]);
        }
      }
      var newinitialstate = {
        address:this.state.address,
        company_name:this.state.company_name,
        website_url: this.state.website_url,
        email:this.state.email,
        phone:this.state.phone,
        id:this.state.id,
      };
      this.setState({ initialstate: newinitialstate });
      this.setState({ editable: false });
    };
    const fail = (msg) => {
      var keys = Object.keys(this.state);
      for (key of keys) {
        if (key === 'editable')
          continue;
        if (!this.state[key]) {
          this._addRedBorder(document.getElementsByName(key)[0]);
        }
        else {
          if (document.getElementsByName(key).length) {
            this._removeRedBorder(document.getElementsByName(key)[0]);
          }
        }
      }
      this.setState({ editable: true });
    };
    Requester.update(APIConstants.businesses.update(this.props.business.id),
      this._formFields(), success, fail);
  }

  _toggleEdit = () => {
    var keys = Object.keys(this.state);
    for (key of keys) {
      if (document.getElementsByName(key).length) {
        this._removeRedBorder(document.getElementsByName(key)[0]);
      }
    }
    this.setState({
      editable : !this.state.editable,
      company_name : this.state.initialstate.company_name,
      website_url: this.state.initialstate.website_url,
      address : this.state.initialstate.address,
      email : this.state.initialstate.email,
      phone : this.state.initialstate.phone,
    });
  }
  _showInput = (label, name, data) => {
    return (
      <EditableInput label        = { label }
                     name         = { name }
                     data         = { data }
                     editable     = { this.state.editable }
                     handleChange = { this._handleChange} />
   )
  }

  _showPhoneInput = (label, name, data) => {
    return (
        <EditablePhoneInput label        = { label }
                            name         = { name }
                            data         = { data }
                            editable     = { this.state.editable }
                            handleChange = { this._handleChange} />
    )
  }

  render() {
    return (
      <div className="edit-profile-container">
        <h1 className="edit-profile-title">Your Business Profile</h1>
        <p className="edit-profile-desc">To change any of this information, click on the "edit" button below.</p>
        <form>
          { this._showInput("Company Name", "company_name", this.state.company_name) }
          { this._showInput("Company Website", "website_url", this.state.website_url) }
          { this._showInput("Email", "email", this.state.email) }
          { this._showPhoneInput("Phone", "phone", this.state.phone) }
          { this._showInput("Address", "address", this.state.address) }
          <FormEditToggle
            editable={ this.state.editable }
            update={ this._toggleEdit }
            save={ this._attemptSave }
            className={ "marginTop-md" } />
        </form>
      </div>
    );
  }
}

EditForm.propTypes = {
  business: React.PropTypes.object.isRequired,
}
