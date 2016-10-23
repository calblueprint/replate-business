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
    let requests = this.props.requests.map( (request) => {
      return (
        <div>{request.title}</div>
      )
    })

    let num_requests = this.props.requests.length

    return (
      <div>
        <h1>Current location: {this.props.location.addr_name}</h1>
        <h2>Address: {this._fullAddress()}</h2>
        <h1>You have {num_requests} requests</h1>
        <br />
        {requests}
      </div>
    )
  }
}
