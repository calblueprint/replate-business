
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
      thisWeekSchedule: {},
      nextWeekSchedule: {},
      isEdit: false,
      basicForm: {},
      recurrenceForm: {},
      showModal: false,
    };
  }

  componentDidMount() {
    this._fetchUpdates();
  }

  _onTabChange = (eventKey) => {
    window.location.hash = Object.keys(this.state.tabMapping)[eventKey - 1]
    this.setState({activeTab: eventKey})
  }

  _setForms = (basicForm, recurrenceForm) => {
    this.setState({ basicForm : basicForm });
    this.setState({ recurrenceForm : recurrenceForm });
    this.setState({ isEdit : true });
    this.setState({ showModal : true});
  }

  _setIsEdit = (edit) => {
    this.setState({ isEdit : edit });
  }

  _setShowModal = (show) => {
    this.setState({ showModal : show });
  }

  _fullAddress = () => {
    let loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  _fetchUpdates = () => {
    const loadThisWeekSchedule = (schedule) => {
      this.setState({ thisWeekSchedule : schedule });
    }
    const loadNextWeekSchedule = (schedule) => {
      this.setState({ nextWeekSchedule : schedule });
    }
    Requester.get(APIConstants.locations.week(this.props.location.id, this._getToday()),
                  loadThisWeekSchedule);
    Requester.get(APIConstants.locations.week(this.props.location.id, this._getNextWeek()),
                  loadNextWeekSchedule);
    const loadLocations = (data) => {
      this.setState({ location: data });
    }
    Requester.get(APIConstants.locations.update(
      this.props.location.id), loadLocations);
  }

  _getToday() {
    return moment().format("YY-MM-DD");
  }

  _getNextWeek() {
    return moment().add(1, 'weeks').format("YY-MM-DD");
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
              <PickupModal
                  location_id = {this.props.location.id}
                  success = {this._fetchUpdates} 
                  basicForm = {this.state.basicForm}
                  recurrenceForm = {this.state.recurrenceForm}
                  isEdit = {false}
                  showModal = {this.state.showModal}
                  setIsEdit = {this._setIsEdit}
                  setShowModal = {this._setShowModal}/>
              <PickupModal
                  location_id = {this.props.location.id}
                  success = {this._fetchUpdates} 
                  basicForm = {this.state.basicForm}
                  recurrenceForm = {this.state.recurrenceForm}
                  isEdit = {true}
                  showModal = {this.state.showModal}
                  setIsEdit = {this._setIsEdit}
                  setShowModal = {this._setShowModal}/>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey={this.state.activeTab}
              onSelect={this._onTabChange}
              className="location-page-tabs container"
              animation={false}
              id={1}>
          <Tab eventKey={1} title="Pickups" tabClassName="tab-icon pickup-tab">
            <WeekOverview today = {moment()}
                          reference = {moment()}
                          schedule = {this.state.thisWeekSchedule}
                          isThisWeek = {true}
                          fetchUpdates = {this._fetchUpdates}
                          setForms = {this._setForms.bind(this)}
                          setIsEdit = {this._setIsEdit}/>
            <WeekOverview today = {moment()}
                          reference = {moment().add(1, 'weeks')}
                          schedule = {this.state.nextWeekSchedule}
                          isThisWeek = {false}
                          fetchUpdates = {this._fetchUpdates}
                          setForms = {this._setForms.bind(this)}
                          setIsEdit = {this._setIsEdit}/>
          </Tab>
          <Tab eventKey={2} title="History" tabClassName="tab-icon history-tab">
            <DonationHistory location = {this.state.location} />
          </Tab>
          <Tab eventKey={3} title="Settings" tabClassName="tab-icon settings-tab">
            <LocationSettings location      = {this.state.location}
                              fetchUpdates = {this._fetchUpdates} />
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
