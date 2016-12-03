/**
* Location editing
* @prop location - location object
* @prop location_id -id of the location
*/

class EditLocation extends DefaultForm{
  constructor(prop){
    super(prop);
    this.state = {
      name: this.props.location.city,
      number: this.props.location.number,
      street: this.props.location.street,
      state: this.props.location.state,
      country: this.props.location.country,
      zip: this.props.location.zip,
      editable: false
    }
    this.initialstate = {
      name: this.props.location.city,
      number: this.props.location.number,
      street: this.props.location.street,
      state: this.props.location.state,
      country: this.props.location.country,
      zip: this.props.location.zip,
      editable: true
    }


  _attemptSave = (e)=> {
    const success = (msg) =>
    this.setState({ editable: false });
  };
    const fail = (msg) =>
    this.setState({ editable: true });
  };
  Requester.update(APIConstants.location.update(this.props.location.id),
      this._formFields(), success, fail);
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

  render() {
    return (
      <div className = "edit_location_container">
        <h1 className = "edit_location_title"> Location Information </h1>
        <form>
         { this._showInput("Location name", "location_name", this.state.city) }
         { this._showInput("Number", "number", this.state.number) }
         { this._showInput("Street", "street", this.state.street) }
         { this._showInput("City", "city", this.state.city) }
         { this._showInput("State", "state", this.state.state) }
         { this._showInput("Zip", "zip", this.state.zip) }
         { this._showInput("Country", "country", this.state.country) }
       <FormEditToggle
           editable={ this.state.editable }
           update={ this._toggleEdit }
           save={ this._attemptSave }
       </form>
    </div>
  );
  }
}

Editing_Location.propTypes = {
  location: React.propTypes.object.isRequired
  location_id: React.PropTypes.number.isRequired
}
