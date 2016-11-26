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
      email:this.props.business.email,
      phone:this.props.business.phone,
      id:this.props.business.id,
      editable: false
    }
    this.state.initialstate = {
      address:this.props.business.address,
      company_name:this.props.business.company_name,
      email:this.props.business.email,
      phone:this.props.business.phone,
      id:this.props.business.id,
      editable: false
    }
  }

  _attemptSave = (e) => {
    const success = (msg) => {
      var newinitialstate = {
        address:this.state.address,
        company_name:this.state.company_name,
        email:this.state.email,
        phone:this.state.phone,
        id:this.state.id,
      };
      this.setState({initialstate: newinitialstate});
      this.setState({ editable: false });
    };
    const fail = (msg) => {
      this.setState({ editable: true });
    };
    Requester.update(APIConstants.businesses.update(this.props.business.id),
      this._formFields(), success, fail);
  }

  _toggleEdit = () => {
    this.setState({ editable : !this.state.editable });
    this.setState({ company_name : this.state.initialstate.company_name, 
      address : this.state.initialstate.address,
      email : this.state.initialstate.email,
      phone : this.state.initialstate.phone
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
          { this._showInput("Company name", "company_name", this.state.company_name) }
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
