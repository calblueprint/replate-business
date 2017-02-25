/**
* Location editing
* @prop location - location object
*/
class EditLocation extends DefaultForm {

  constructor(prop){
    super(prop);
    this.state = {
      editable: false,
}
  }

  _attemptSave = (e)=> {
    const success = (msg) => {
      this.setState({ editable: false });
    };

    const fail = (msg) => {
      this.setState({ editable: true });
    };
    Requester.update(APIConstants.locations.update(this.props.location.id)


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
      <div className = "edit_location_container">
        <form>
         { this._showInput("Location Name", "location_name", this.props.location.city) }
         { this._showInput("Number", "number", this.props.location.number) }
         { this._showInput("Street", "street", this.props.location.street) }
         { this._showInput("City", "city", this.props.location.city) }
         { this._showInput("State", "State", this.props.location.state) }
         { this._showInput("Zip", "zip", this.props.location.zip) }
         { this._showInput("Country", "country", this.props.location.country) }
       <FormEditToggle
           editable={ this.state.editable }
           update={ this._toggleEdit }
           save={ this._attemptSave } />
       </form>
    </div>
    );
  }
}

EditLocation.propTypes = {
  location: React.PropTypes.object.isRequired,
}
