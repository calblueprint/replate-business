/**
 * Component to render requests for a location
 * @prop requests - list of requests to render
 */
class LocationPickups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pickups = this.props.pickups.map((pickup, i) => {
      return <div key={i}>{pickup.title}</div>
    })

    let num_pickups = this.props.pickups.length;

    return (
      <div>
        <h1>You have {num_pickups} pickups</h1>
        <br />
        {pickups}
      </div>
    )
  }
}

LocationPickups.propTypes = {
  pickups : React.PropTypes.array.isRequired,
}
