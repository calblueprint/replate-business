/**
 *
 @prop business_id - id of the business that is creating locations
 @prop success - success function that is called when location is created successfully!
 **/
class LocationCreationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      business_id : this.props.business_id,
      loading: false,
    }
    this.state.initialState = {
      business_id : this.props.business_id,
      loading: false,
    }
    this.initMap = this.initMap.bind(this);
  }

  _attemptCreate = (e) => {
    this.setState({ loading: true, });

    const success = (data) => {
      this.props.success();
      this.setState({ loading: false, });
      this.close();
    }

    // Allow loading animation to persist for 500ms
    setTimeout(() => {
      this._attemptAction(APIConstants.locations.create, this.state, success, success);
    }, 500)
  }
  

  open = (e) => {
    this.setState({ showModal: true });
  }

  initMap = (e) => {
        
        var locationForm = this;
        if (document.getElementById('map').innerHTML||!e) {  
          return;
        }
        var map = new google.maps.Map(this.mapDiv, {
          center: {lat:37.791569, lng:-122.389938},
          zoom: 8
        });
        var marker = new google.maps.Marker({
          position: {lat:37.791569, lng:-122.389938},
          map: map
        });
      
        var autocomplete = new google.maps.places.Autocomplete(this.locationInput);       
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          var lat = place.geometry.location.lat();
          var lon = place.geometry.location.lng();
          locationForm.setState({lat: lat});
          locationForm.setState({lon: lon});

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

  close = (e) => {
    var initial = this.state.initialState;
    this.state = initial;
    this.setState({initialState: initial});
    this.setState({ showModal: false });
    document.getElementById('map').innerHTML = '';

  }

  render() {
    let loadingContainer;

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    return (
      <div className="new-location-component">
        <button onClick={this.open} type="button" className="button new-location-button">
          <span className="fa fa-plus marginRight-xxs"></span>
          Add a new location
        </button>
        <Modal show={this.state.showModal} onHide={this.close} className="location-creation-modal">
          {loadingContainer}
          <Modal.Header>
            <h3 className="modal-title">Add New Location</h3>
          </Modal.Header>
          <Modal.Body>
            <label className="label label--newline">Office Name</label>
            <input type="text" placeholder="New York Office" name="addr_name"
                       onChange={this._handleChange} className="input" />
            <label className="label label--newline">Office Email (optional)</label>
            <input type="text" placeholder="a@a.com" name="email"
                       onChange={this._handleChange} className="input" />
            <label className="label label--newline">Office Address</label>
            <input ref={(input) => { this.locationInput = input}} className="input address">

            </input>

            <div className="modal-content" id="map" ref={(input) => { this.mapDiv = input; this.initMap(input);}}>
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="button button--text-alert pull-left"
                    onClick={this.close}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this._attemptCreate}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

LocationCreationForm.propTypes = {
  business_id : React.PropTypes.number.isRequired,
  success     : React.PropTypes.func.isRequired,
};
