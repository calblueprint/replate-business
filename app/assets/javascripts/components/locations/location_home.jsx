var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

/**
 * @prop location - current location object of page
 * @prop requests - collection (array) of requests attached to location
 */
class LocationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
    };
  }

  _fullAddress = () => {
    loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchLocation = () => {
    const success = (data) => {
      this.setState({ requests: data });
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
          <Tab eventKey={1} title="Requests">
            <LocationRequests requests = {this.state.requests} />
          </Tab>
          <Tab eventKey={2} title="History">Add donation history here</Tab>
          <Tab eventKey={3} title="Settings">Add location settings here</Tab>
        </Tabs>

        <br />
        <RequestCreationForm
                location_id = {this.props.location.id}
                success     = {this._fetchLocation} />
      </div>
    )
  }
}

LocationHome.propTypes = {
  location : React.PropTypes.object.isRequired,
  requests : React.PropTypes.array.isRequired
};
