var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

/**
 * @prop company  - the location's company name
 * @prop location - current location object of page
 * @prop pickups  - collection (array) of pickups attached to location
 */
class LocationHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this._fetchLocation();
  }

  _fullAddress = () => {
    loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchLocation = () => {
    const success = (data) => {
      this.setState({ location: data });
    }
    Requester.get(APIConstants.locations.update(
      this.props.location.id), success);
  }

  render() {

    return (
      <div>
        <div className="location-page-header">
          <div className="image img-container">
            <img src={this.state.location.url} />
          </div>
          <div className="name">
            <h1 className="location-page-title">
              {this.props.location.addr_name}
            </h1>
            <h2 className="location-page-addr">{this._fullAddress()}</h2>
          </div>
        </div>

        <Tabs defaultActiveKey={1} animation={false} id={1}>
          <Tab eventKey={1} title="Pickups" tabClassName="tab-icon pickup-tab">
            <WeekOverview />
            <h2 className="pickup-section-title">All Pickups</h2>
            <LocationPickups pickups = {this.state.location.pickups} />
          </Tab>
          <Tab eventKey={2} title="History" tabClassName="tab-icon history-tab">
            Add donation history here
          </Tab>
          <Tab eventKey={3} title="Settings" tabClassName="tab-icon settings-tab">
            <LocationSettings location      = {this.state.location}
                              fetchLocation = {this._fetchLocation} />
          </Tab>
        </Tabs>

        <br />
        <PickupCreationModal
                location_id = {this.props.location.id}
                success     = {this._fetchLocation} />
      </div>
    )
  }
}

LocationHome.propTypes = {
  location : React.PropTypes.object.isRequired,
  pickups  : React.PropTypes.array.isRequired
};
