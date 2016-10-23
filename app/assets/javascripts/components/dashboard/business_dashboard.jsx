/**
 * @prop business - the current business that is signed in
 * @prop locations  - collection (array) of locations attached to business
 */
class BusinessDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  _fullAddress = (loc) => {
    return `${loc.addr_name} ${loc.number} ${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
  }

  render() {
    let locs;
    if (this.props.locations) {
      locs = this.props.locations.map( (location) => {
          return (
            <div>
              <a href={`/locations/`+location.id}>
                {this._fullAddress(location)}
              </a>
            </div>
          )
        }
      )
    } else {
      locs = "You don't have a location! Click here to add one."
    }
    return (
      <div>
        {this.props.business.company_name}
        {locs}
      </div>
    )
  }
}
