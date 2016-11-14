/**
 * Component to render requests for a location
 * @prop pickups - list of requests to render
 */
class LocationPickups extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let pickups = 0;
    let num_pickups = 0;

    if (this.props.pickups) {
      pickups = this.props.pickups.map((pickup, i) => {
        return <div key={i}>{pickup.title}</div>
      });

      num_pickups = this.props.pickups.length;
    } else {
      pickups = "Loading Your Pickups";
    }

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
  pickups : React.PropTypes.array,
}
