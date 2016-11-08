/**
 * Component to render requests for a location
 * @prop requests - list of requests to render
 */
class LocationRequests extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let requests = this.props.requests.map((request, i) => {
      return <div key={i}>{request.title}</div>
    })

    let num_requests = this.props.requests.length;

    return (
      <div>
        <h1>You have {num_requests} requests</h1>
        <br />
        {requests}
      </div>
    )
  }
}
