
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
        <div onClick={this._sample}>{request.title}</div>
      )
    })

    return (
      <div>
        <h1>Current location: {this.props.location.addr_name}</h1>
        <h2>Address: {this._fullAddress()}</h2>
        <br />
        {requests}
      </div>
    )
  }
}
