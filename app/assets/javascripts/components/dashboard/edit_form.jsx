class EditForm extends DefaultForm {
  constructor(props) {
    super(props); 
    
    this.state = {
      business:this.props.business,
      editable: false,
    }    
  } 

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  }

  _refactorState(s) {
    if (s.email) {
      s.business.email = s.email;
      s.email = undefined;
    }
    if (s.company_name) {
      s.business.company_name = s.company_name;
      s.company_name = undefined;
    }
    if (s.phone) {
      s.business.phone = s.phone;
      s.phone = undefined;
    }
    if (s.address) {
      s.business.address = s.address;
      s.address = undefined;
    }
    if (s.current_password) {
      s.business.current_password = s.current_password;
      s.current_password = undefined;
    }
    var refactored = {
      business:s.business
    };
    return refactored;
  }


  _formFields() {
    // Necessary because bootstrap-select does not fire onChange events
    const extraFields = { };
    $('.selectpicker').each((index, element) => {
        extraFields[$(element).attr("name")] = $(element).val();
    });
    var s = this.state; //following 4 lines makes sure the form is sending the right object to update business
    s.editable = undefined;
    s = this._refactorState(s);
    return $.extend({}, s, extraFields);
  }

  _attemptSave = (e) => {
      const success = (msg) => {
          this.setState({ editable: false });     
      };
      Requester.update(APIConstants.businesses.edit,
          this._formFields(), success);
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
        { this._showInput("Email", "email", this.state.business.email) }
        { this._showInput("Company name", "company_name", this.state.business.company_name) }
        { this._showInput("Phone", "phone", this.state.business.phone) }
        { this._showInput("Address", "address", this.state.business.address) } 
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