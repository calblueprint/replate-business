/**
 * Component to render requests for a location
 * @prop id - location ID to update
 */
class LocationSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { uploadSuccess: false }
  }

  _setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = (file) => {
      this.setState({
        photo: file.target.result,
      })
    }

    reader.readAsDataURL(files[0]);
  }

  _uploadFile = (e) => {
    e.preventDefault();

    const success = (data) => {
      this.setState({
        uploadSuccess: true,
      })
    }

    let params = {
      photo: this.state.photo
    }

    Requester.update(APIConstants.locations.update(this.props.id), params, success);
  }

  render() {
    let uploadMsg;

    if (this.state.uploadSuccess) {
      uploadMsg = "Upload Success!";
    }

    return (
      <div>
        <h2>Upload!</h2>
        <form onSubmit={this._uploadFile}>
          <input type="file" onChange={this._setFile} />
          <input type="submit" />
        </form>
        {uploadMsg}
      </div>
    )
  }
}

LocationSettings.propTypes = {
  id : React.PropTypes.number.isRequired,
}
