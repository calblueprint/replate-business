var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

/**
 * @prop location - current location object of page
 * @prop pickups - collection (array) of pickups attached to location
 */
class LocationHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pickups: this.props.pickups,
    };
  }

  _fullAddress = () => {
    loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchLocation = () => {
    const success = (data) => {
      this.setState({ pickups: data });
    }
    Requester.get(APIConstants.locations.update(
      this.props.location.id), success);
  }

  render() {

    return (
      <div>
        <h1 className="dashboard-title">{this.props.company} | Replate Dashboard</h1>
        <div className="location-page-title">
          <span className="name">{this.props.location.addr_name}</span>
          <span className="addr">{this._fullAddress()}</span>
        </div>

        <Tabs defaultActiveKey={1} animation={false} id={1}>
          <Tab eventKey={1} title="Pickups">
            <LocationPickups pickups = {this.state.pickups} />
          </Tab>
          <Tab eventKey={2} title="History">Add donation history here</Tab>
          <Tab eventKey={3} title="Settings">
            <LocationSettings id = {this.props.location.id} />
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
  pickups : React.PropTypes.array.isRequired
};
