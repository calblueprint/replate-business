/**
 * Component to render requests for a location
 * @prop location      - location object to update
 * @prop fetchUpdates  - callback function to retrieve updates
 */
class LocationSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {},
      uploadSuccess: false,
      editable: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ location: nextProps.location });
  }


  _handleChange = (e) => {
    let target = $(e.target);
    this.setState({ [target.attr('name')]: target.val() });
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

  _toggleEdit = () => {
    // var keys = Object.keys(this.state);
    // for (key of keys) {
    //   if (document.getElementsByName(key).length) {
    //     this._removeRedBorder(document.getElementsByName(key)[0]);
    //   }
    // }
    this.setState({
      editable : !this.state.editable,
      
    });
  }

  _addRedBorder = (input, type) => {
    input.parentNode.classList.add(type);
    input.classList.add("red-border");
  }

  _removeRedBorder = (input, type) => {
    input.parentNode.classList.remove(type);
    input.classList.remove("red-border");
  }

  _validateEmail = (input) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
  }
  
  _attemptSave = () => { //email not right, email same as business, or returns err
    const locationGetSuccess = (resp) => {
      this.setState({location: resp});
    }
    const success = (data) => {
      
      Requester.get(APIConstants.locations.show(this.state.location.id),locationGetSuccess);
      this._removeRedBorder(document.getElementsByName("email")[0],"updateerror");
      this._removeRedBorder(document.getElementsByName("email")[0],"invalid");
      this._removeRedBorder(document.getElementsByName("email")[0],"same");
      this.setState({editable: false,});
    }
    const fail = (data) => {
      this._addRedBorder(document.getElementsByName("email")[0],"updateerror");
    }
    if (this.state.email) {
      var validated = this._validateEmail(this.state.email);
      if (validated == false) {
        this._addRedBorder(document.getElementsByName("email")[0],"invalid");
        
      }
      else {
        if (this.state.email == this.props.business.email) {
          this._addRedBorder(document.getElementsByName("email")[0],"same");
        }
        else {
          Requester.update(APIConstants.locations.update(this.state.location.id),this.state,success,fail);
        }
      }
    } else {
      Requester.update(APIConstants.locations.update(this.state.location.id),this.state,success,fail);
    }
    
  }

  _setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = (file) => {
      this.setState({ photo: file.target.result, });
    }

    reader.readAsDataURL(files[0]);
  }

  _uploadFile = (e) => {
    e.preventDefault();

    const success = (data) => {
      this.props.fetchUpdates();

      this.setState({
        location: data,
        uploadSuccess: true,
      });
    }

    let params = { photo: this.state.photo, };

    Requester.update(APIConstants.locations.update(this.props.location.id),
      params, success, success);
  }

  render() {
    let uploadMsg;

    if (this.state.uploadSuccess) {
      uploadMsg = "Upload Success!";
    }

    return (
      <div className="location-settings">
        <div className="location-settings-img-col">
          <h2 className="settings-title">Location Image</h2>
          <div className="location-setting-img">
            <img src={this.state.location.url} />
          </div>
          <h2>Upload a new image</h2>
          <form onSubmit={this._uploadFile}>
            <input type="file" onChange={this._setFile} />
            <input type="submit" />
          </form>
          {uploadMsg}
          <br/>
        </div>

        <div className="location-settings-input-col">
          <h2 className="settings-title">Location Details</h2>
          { this._showInput("Email(optional)", "email", this.state.location.email) }
          { this._showInput("Location name", "addr_name", this.state.location.addr_name) }
          
          <FormEditToggle
            editable={ this.state.editable }
            update={ this._toggleEdit }
            save={ this._attemptSave}
            className={ "marginTop-md" } />

          <br/>
          
          <DeleteLocationModal location={this.state.location} />
        </div>
      </div>
    )
  }
}

LocationSettings.propTypes = {
  location      : React.PropTypes.object.isRequired,
  fetchUpdates  : React.PropTypes.func.isRequired,
}
