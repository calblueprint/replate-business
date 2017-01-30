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
        console.log(e);
        console.log(this.state.showModal);
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

        //google.maps.event.trigger(map, 'resize');       
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
            <input type="text" placeholder="New York Office" name="addr_name"
                       onChange={this._handleChange} className="input" />

            <input ref={(input) => { this.locationInput = input}}>

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
