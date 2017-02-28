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
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ location: nextProps.location });
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
