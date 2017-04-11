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

  _addRedBorder = (input) => {
    input.parentNode.classList.add("fail");
    input.classList.add("red-border");
  }

  _removeRedBorder = (input) => {
    input.parentNode.classList.remove("fail");
    input.classList.remove("red-border");
  }
  
  _attemptGeocode = () => {
    const geocodeSuccess = (response) => {
      if (response.status === "OK") {
        this.setState({editable: false,});
        var params = {};
        if (this.state.email) {
          params.email = this.state.email;
        }
        if (this.state.addr_name) {
          params.addr_name = this.state.addr_name;
        }
        if (this.state.number) {
          params.number = this.state.number;
        }
        if (this.state.street) {
          params.street = this.state.street;
        }
        if (this.state.city) {
          params.city = this.state.city;
        }
        if (this.state.state) {
          params.state = this.state.state;
        }
        if (this.state.country) {
          params.country = this.state.country;
        }
        if (this.state.zip) {
          params.zip = this.state.zip;
        }
        Requester.update(APIConstants.locations.update(this.state.location.id),params);
        var input = document.getElementsByClassName("editable-input-box-container");
        this._removeRedBorder(input[input.length-1]);
      }
      else { 
        this.setState({location:oldState}); 
        this.setState({number:null});
        this.setState({city:null});
        this.setState({state:null});
        this.setState({country:null});
        this.setState({zip:null});
        this.setState({location:oldState});
        var input = document.getElementsByClassName("editable-input-box-container");
        this._addRedBorder(input[input.length-1]);

      }
    }
    

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var location = this.state.location; //location becomes modified state
    var oldState = this.state.location; //oldstate is the old version
    for (var key in location) {
      if (location.hasOwnProperty(key)) {
        if (this.state[key] != null) {
          location[key] = this.state[key];
        }
      }
    }
    this.setState({location: location});
    var address = this.state.location.number+" "+this.state.location.street+" "+this.state.location.city+" "+this.state.location.state+" "+this.state.location.zip;
    const request = new XMLHttpRequest();
    request.open("get", url+address);
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            geocodeSuccess(JSON.parse(request.response));
          }
        }
      };
    request.send();
    //Requester.get(url+address+"key=AIzaSyCThh_we8bP7cj4eK3tlmEB8ri1HJlcDQA",geocodeSuccess,geocodeFailure,false);
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
        </div>

        <div className="location-settings-input-col">
          <h2 className="settings-title">Location Details</h2>
          { this._showInput("Email(optional)", "email", this.state.location.email) }
          { this._showInput("Location name", "addr_name", this.state.location.addr_name) }
          { this._showInput("Street number", "number", this.state.location.number) }
          { this._showInput("Street name", "street", this.state.location.street) }
          { this._showInput("City", "city", this.state.location.city) }
          { this._showInput("State", "state", this.state.location.state) }
          { this._showInput("Country", "country", this.state.location.country) }
          { this._showInput("Zip code", "zip", this.state.location.zip) }
          <FormEditToggle
            editable={ this.state.editable }
            update={ this._toggleEdit }
            save={ this._attemptGeocode }
            className={ "marginTop-md" } />
          
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
