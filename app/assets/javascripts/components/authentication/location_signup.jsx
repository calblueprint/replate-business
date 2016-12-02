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

  _saveLocationData = () => {
    const data = this._formFields();
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

        { this._renderInputField("addr_name", "Office Name", "text", "SF Office") }
        { this._renderInputField("number", "Number", "text") }
        { this._renderInputField("street", "Street", "text") }
        { this._renderInputField("city", "City", "text") }
        { this._renderInputField("state", "State", "text") }
        { this._renderInputField("country","Country", "text") }
        { this._renderInputField("zip","ZIP", "text") }

        <div className="marginTopBot-xl">
          <button className="button signup-btn-right"
            onClick={this._saveLocationData}>Sign Up</button>
        </div>
      </div>
    );
  }
}
