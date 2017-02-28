
var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

/**
 * @prop location - current location object of page
 * @prop pickups  - collection (array) of pickups attached to location
 */
class LocationHome extends React.Component {

  constructor(props) {
    super(props);
    const tabMapping = {
      pickups: 1,
      history: 2,
      settings: 3,
    }

    let active = 1;
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      active = tabMapping[hash]
    } else {
      window.location.hash = Object.keys(tabMapping)[0];
    }

    this.state = {
      location: {},
      activeTab: active,
      tabMapping: tabMapping,
      schedule: {},
    };
  }

  componentDidMount() {
    this._fetchUpdates();
  }

  _onTabChange = (eventKey) => {
    window.location.hash = Object.keys(this.state.tabMapping)[eventKey - 1]
    this.setState({activeTab: eventKey})
  }

  _fullAddress = () => {
    loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchUpdates = () => {
    const loadSchedule = (schedule) => {
      this.setState({schedule: schedule});
    }
    Requester.get(APIConstants.locations.week(this.props.location.id, this._getToday()),
                  loadSchedule);
    const loadLocations = (data) => {
      this.setState({ location: data });
    }
    Requester.get(APIConstants.locations.update(
      this.props.location.id), loadLocations);
  }

  _getToday() {
    let date = new Date();
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString();
    let dd  = date.getDate().toString();

    let mmChars = mm.split('');
    let ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }

  render() {

    return (
      <div>
        <div className="location-page-header">
          <div className="container">
            <div className="image img-container">
              <img src={this.state.location.url} />
            </div>
            <div className="name">
              <h1 className="location-page-title">
                {this.props.location.addr_name}
              </h1>
              <h2 className="location-page-addr">{this._fullAddress()}</h2>
            </div>

            <div className="location-page-buttons">
              <button className="button button--outline feedback-btn">Leave Feedback</button>
              <PickupCreationModal
                  location_id = {this.props.location.id}
                  success     = {this._fetchUpdates} />
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey={this.state.activeTab}
              onSelect={this._onTabChange}
              className="location-page-tabs container"
              animation={false}
              id={1}>
          <Tab eventKey={1} title="Pickups" tabClassName="tab-icon pickup-tab">
            <WeekOverview today = {this._getToday()}
                          schedule = {this.state.schedule}/>
          </Tab>
          <Tab eventKey={2} title="History" tabClassName="tab-icon history-tab">
            <DonationHistory location = {this.state.location} />
          </Tab>
          <Tab eventKey={3} title="Settings" tabClassName="tab-icon settings-tab">
            <LocationSettings location      = {this.state.location}
                              fetchLocation = {this._fetchLocation} />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

LocationHome.propTypes = {
  location : React.PropTypes.object.isRequired,
  pickups  : React.PropTypes.array.isRequired,
};
