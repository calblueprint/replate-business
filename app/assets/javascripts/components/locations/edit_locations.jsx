/**
* Location editing
* @prop location - location object
* @prop location_id -id of the location
*@prop edit -
*/
class EditLocation extends DefaultForm {

  constructor(prop){
    super(prop);
    this.state = {
      location: {},
    }
  }

  componentWillUpdate(data) {
    this.setState({ location: data.location });
  }


  _attemptSave = (e)=> {
      const success = (msg) => {
        this.setState({ editable: false });
      };

      const fail = (msg) => {
        this.setState({ editable: true });
      };
      Requester.update(APIConstants.locations.update(this.props.location.id),
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
      <div className = "edit_location_container">
        <h1 className = "edit_location_title"> Location Information </h1>
        <form>
         { this._showInput("Location Name", "location_name", this.state.location.city) }
         { this._showInput("Number", "number", this.state.location.number) }
         { this._showInput("Street", "street", this.state.location.street) }
         { this._showInput("City", "city", this.state.location.city) }
         { this._showInput("State", "state", this.state.location.state) }
         { this._showInput("Zip", "zip", this.state.location.zip) }
         { this._showInput("Country", "country", this.state.location.country) }
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
    location: React.propTypes.object.isRequired,
    location_id: React.PropTypes.number.isRequired,
}
