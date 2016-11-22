class EditForm extends DefaultForm {
  constructor(props) {
    super(props); 
    console.log(this.props.business)
    this.state = {
      address:this.props.business.address,
      company_name:this.props.business.company_name,
      email:this.props.business.email,
      phone:this.props.business.phone,
      id:this.props.business.id,
      editable: false
    }    
  } 

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  }


  _attemptSave = (e) => {
      const success = (msg) => {
          this.setState({ editable: false });     
      };
      const fail = (msg) => {
          this.setState({ editable: true });     
      };
      Requester.update(APIConstants.businesses.update(this.props.business.id),
          this._formFields(), success, fail);
    }


  _showInput = (label, name, data) => {
      return (
          <EditableInput label        = { label }
                         name         = { name }
                         data         = { data }
                         editable     = { this.state.editable }
                         handleChange = { this._handleChange} />
      );
  }

  render() {
    return ( 
     <div> 
        { this._showInput("Email", "email", this.state.email) }
        { this._showInput("Company name", "company_name", this.state.company_name) }
        { this._showInput("Phone", "phone", this.state.phone) }
        { this._showInput("Address", "address", this.state.address) } 
        Password
        <input type="password" name="current_password" id="business_current_password" onChange={this._handleChange}/>  
        <input className="selectpicker" type="hidden" name="_method" value="put"/>
        <input
          className="selectpicker" 
          type="hidden"
          name="authenticity_token"
          value={ this._getToken() }
        />
        <FormEditToggle 
          editable={ this.state.editable }
          update={ this._toggleEdit }
          save={ this._attemptSave } />
      </div>
    );
  }
}