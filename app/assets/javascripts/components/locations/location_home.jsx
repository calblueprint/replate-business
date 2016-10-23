/**
 * @prop location - current location object of page
 * @prop requests  - collection (array) of requests attached to location
 */
class LocationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  _fullAddress = () => {
    loc = this.props.location;
    return `${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  render() {
    let requests = this.props.requests.map((request, i) => {
      return <div key={i}>{request.title}</div>
    })

    let num_requests = this.props.requests.length;

    return (
      <div className="marginTop-xl">
        <h1 className="dashboard-title">{this.props.company} | Replate Dashboard</h1>
        <div className="location-page-title">
          <span className="name">{this.props.location.addr_name}</span>
          <span className="addr">{this._fullAddress()}</span>
        </div>
        <h1>You have {num_requests} requests</h1>
        <br />
        {requests}
      </div>
    )
  }
}
