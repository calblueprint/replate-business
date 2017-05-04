/**
 * Renders the home business dashboard view
 * @prop business_id - the current business that is signed in
 */
class BusinessDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {},
    };
  }

  componentDidMount() {
    this._fetchBusinessData();
  }

  _fullAddress = (loc) => {
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchBusinessData = () => {
    const success = (data) => {
      this.setState({ business: data });
    }
    Requester.get(APIConstants.businesses.update(
      this.props.business_id), success);
  }

  render() {
    let locs;
    if (this.state.business.locations) {
      locs = this.state.business.locations.map((location, i) => {
        const imgAltText = `location photo for ${location.addr_name}`;

        return (
          <div className="location-item-col" key={i}>
            <a href={`/locations/` + location.id}>
              <div className="location">
                <div className="location-photo">
                  <img src={location.url} alt={imgAltText} />
                </div>
                <h4 className="location-title">{location.addr_name}</h4>
                <p className="location-addr">{this._fullAddress(location)}</p>
              </div>
            </a>
          </div>
        )
      })
    } else {
      locs = "You don't have a location! Click here to add one."
    }

    return (
      <div>
        <h1 className="dashboard-title marginTop-xxl">Dashboard</h1>
        <h2 className="company-title marginBot-xl">Welcome, {this.state.business.company_name}. Thank you for Replating with us!</h2>

        <div className="section-header header--buttons marginBot-sm">
          <h3 className="dashboard-section-title marginRight-sm">Office Locations</h3>
          <LocationCreationForm
                business_id = {this.props.business_id}
                success     = {this._fetchBusinessData} />
        </div>
        <div className="dashboard-locations-container">
          {locs}
        </div>
      </div>
    )
  }
}

BusinessDashboard.propTypes = {
  business_id: React.PropTypes.number.isRequired,
}
