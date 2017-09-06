
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
      invoice: 2,
      settings: 3,
      impact: 4,
      history: 5
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
      business: {},
      activeTab: active,
      tabMapping: tabMapping,
      thisWeekSchedule: {},
      nextWeekSchedule: {},
      tasks: [],
      showEditModal: false,
      basicForm: {},
      recurrenceForm: {},
    };
    this._fetchImpactUpdates();
  }

  componentDidMount() {
    this._fetchUpdates();
    this._fetchBusinessData();
  }

  _fetchBusinessData = () => {
    const success = (data) => {
      this.setState({ business: data });
    }
    Requester.get(APIConstants.businesses.update(
      this.props.location.business_id), success);
  }
  _fetchImpactUpdates = () => {
    const success = (data) => {
      this.setState({ tasks : data });
    }

    Requester.get(APIConstants.locations.getTasks(
      this.props.location.id), success)
  }

  _onTabChange = (eventKey) => {
    window.location.hash = Object.keys(this.state.tabMapping)[eventKey - 1]
    this.setState({activeTab: eventKey})
    this._fetchImpactUpdates();
  }

  _setForms = (basicForm, recurrenceForm) => {
    this.setState({ basicForm : basicForm,
                    recurrenceForm : recurrenceForm,
                  });
  }

  _showEditModal = () => {
    this.setState({ showEditModal : true });
  }

  _hideEditModal = () => {
    this.setState({ showEditModal : false });
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
                  basicForm = {{}}
                  recurrenceForm = {{}}
                  isEdit = {false}/>
              <PickupModal
                  location_id = {this.props.location.id}
                  success = {this._fetchUpdates}
                  basicForm = {this.state.basicForm}
                  recurrenceForm = {this.state.recurrenceForm}
                  isEdit = {true}
                  showModal = {this.state.showEditModal}
                  hideEditModal = {this._hideEditModal}/>
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
                          showEditModal = {this._showEditModal}/>
            <WeekOverview today = {moment()}
                          reference = {moment().add(1, 'weeks')}
                          schedule = {this.state.nextWeekSchedule}
                          isThisWeek = {false}
                          fetchUpdates = {this._fetchUpdates}
                          setForms = {this._setForms.bind(this)}
                          showEditModal = {this._showEditModal}/>
          </Tab>
          <Tab eventKey={2} title="Invoice" tabClassName="tab-icon history-tab">
            { this.state.activeTab == 2 &&
            <LocationInvoice location = {this.props.location} business = {this.state.business}/>
          }
          </Tab>
          {/*<Tab eventKey={3} title= "Impact" tableClassName="tab-icon impact-tab">
              <Impact         location_id = {this.props.location.id}
                              tasks       = {this.state.tasks}/>
          </Tab>*/}
          <Tab eventKey={3} title="Settings" tabClassName="tab-icon settings-tab">
            <LocationSettings location      = {this.state.location}
                              fetchUpdates = {this._fetchUpdates}
                              business = {this.state.business} />
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
