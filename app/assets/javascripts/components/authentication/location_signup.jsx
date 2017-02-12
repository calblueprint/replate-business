const DEFAULT_FILE = "Choose a Photo";

/**
 * Component for Location creation during signup
 * @prop save - callback function to save location data to parent
 */
class LocationSignup extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      business_id: this.props.businessID,
      file: DEFAULT_FILE,
    };
    this.initMap = this.initMap.bind(this);
  }

  _renderInputField = (name, label, inputType, placeholder) => {
    return (
      <fieldset className="input-container">
        <label htmlFor={name} className="label label--newline">{label}</label>
        <input type={inputType} className="input" name={name}
          placeholder={placeholder} id={name}
          onChange={this._handleChange} />
      </fieldset>
    )
  }

  initMap = (e) => {
        
        var locationForm = this;
        if (document.getElementById('map').innerHTML||!e) {  
          return;
        }
        var map = new google.maps.Map(document.getElementById("map"), {
          center: {lat:37.791569, lng:-122.389938},
          zoom: 8
        });
        var marker = new google.maps.Marker({
          position: {lat:37.791569, lng:-122.389938},
          map: map
        });
      
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById("addr"));       
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types.includes('street_number')) {
              locationForm.setState({ number:place.address_components[i].long_name });
            }
            else if (place.address_components[i].types.includes('route')) {           
              locationForm.setState({ street:place.address_components[i].long_name });
            }
            else if (place.address_components[i].types.includes('locality')) {
              locationForm.setState({ city:place.address_components[i].long_name });
            }
            else if (place.address_components[i].types.includes('administrative_area_level_1')) {
              locationForm.setState({ state:place.address_components[i].long_name });
            }
            else if (place.address_components[i].types.includes('postal_code')) {
              locationForm.setState({ zip:place.address_components[i].long_name });
            }
            else if (place.address_components[i].types.includes('country')) {
              locationForm.setState({ country:place.address_components[i].long_name });
            }
            else {
            }
          }
        });
  }

  _saveLocationData = () => {
    const data = { addr_name:this.state.addr_name,
      number:this.state.number,
      street:this.state.street,
      city:this.state.city,
      state:this.state.city,
      country:this.state.country,
      zip:this.state.zip

    }
    this.props.save(data);
  }

  _setPhotoFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = (file) => {
      this.setState({
        photo: file.target.result,
        file: e.target.value.split("\\").pop() || DEFAULT_FILE,
      });
    }

    reader.readAsDataURL(files[0]);
  }

  _renderImagePreview = () => {
    if (this.state.photo) {
      return (
        <div className="img-container signup-img-preview marginBot-md">
          <img src={this.state.photo} />
        </div>
      )
    }
  }

  render() {
    const spanClass = "fa " + (this.state.photo ?  "fa-check-circle-o" : "fa-upload");

    return (
      <div>
        <div className="marginTop-xl signup-section-title-num">2</div>
        <h2 className="signup-section-title">Main Office Location</h2>
        <p className="marginBot-lg">Let us know the location of your office. You'll be able to create more locations later!</p>

        <fieldset className="input-container">
          <label htmlFor="upload" className="label label--newline">Upload Office Image</label>

          <div className="signup-upload-container">
            <label htmlFor="location-photo-upload"
              className="button button--outline marginTopBot-sm signup-upload-label">
              <span className={spanClass}></span>
              <span className="marginLeft-xs">{ this.state.file }</span>
            </label>
            <input type="file" name="upload" id="location-photo-upload"
              onChange={this._setPhotoFile} />
            { this._renderImagePreview() }
          </div>
        </fieldset>
        <label className="label label--newline">Office Name</label>
            <input type="text" placeholder="New York Office" name="addr_name"
                       onChange={this._handleChange} className="input" />
        <label className="label label--newline">Office Address</label>
        <input ref={(input) => { this.locationInput = input}} className="input address" id="addr">

        </input>
        <div id = "map" ref={(input) => { this.mapDiv = input; this.initMap(input);}}>

        </div>

        <div className="marginTopBot-xl clearfix">
          <button className="button signup-btn-right"
            onClick={this._saveLocationData}>Sign Up</button>
        </div>
      </div>
    );
  }
}
