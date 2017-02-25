/**
 * Renders the home admin dashboard view
 * @prop admin - the current admin that is signed in
 */

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }

  componentDidMount() {
    this.fetchAdmindata();
  }



  render() {
    let locs;
    locs = this.state.admin.map(businesses, i) => {
    const imageBusiness = //pic business?
      return (
        <div className= "" ></div>
        let locs;
        if (this.state.business.locations) {
          locs = this.state.business.locations.map((location, i) => {
            const imgAltText = `location photo for ${location.addr_name}`;

            return (
              <div className="location-item-col" key={i}>
                <a href={`/locations/` + location.id}>
                  <div className="location">
                    <div className="location-photo">
                      <img src={location.url} alt={imgAltText} />
                    </div>
                    <h4 className="location-title">{location.addr_name}</h4>
                    <p className="location-addr">{this._fullAddress(location)}</p>
                  </div>
                </a>
              </div>
            )
          })
        } else {
          locs = "You don't have a location! Click here to add one."
        }
      )




    return (
      return (
            <div>
              <h1 className="dashboard-title marginTop-xxl">Admin Dashboard</h1>
              <h2 className="Admin Panel"></h2>
              <div className="section-header header--buttons marginBot-sm">
                <h3 className="businesses-section-title marginRight-sm">Businesses</h3>
              </div>
              <div className="dashboard-businesses-container">
                {locs}
              </div>
            </div>
)
}
}
//
//
//
//
//     )
//     }
//   }
//  }
