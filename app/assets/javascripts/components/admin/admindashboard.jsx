/**
 * Renders the home admin dashboard view
 * @prop admin - the current admin that is signed in
 * @prop business_ids - array of businesses ids
 */

class NewAdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResult: true,
      searchInput: "",
    };
    this.state.business_ids = props.business_ids;
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    this.setState({ searchInput: input });
  }

  render() {
    let businesses;
    businesses = this.props.business_ids.map((id) => {
      return (
        <BusinessDashboard
          business_id = {id} />
        )
      })

    return(
      <div className="content-wrapper roster-page container">
          <div className="roster-header">
            <h1 className="roster-title">Businesses</h1>
            <div className="roster-header-controls">

              <div className="searchbar">
                <input type="text" name="first_name" className="form-control"
                  placeholder="Search for a person" />
              </div>
            </div>
          </div>
          <div className="roster-container">
            <table className="interactive roster-table">
              <thead id="table-head">
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Instrument</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

NewAdminDashboard.propTypes = {
  business_ids: React.PropTypes.array.isRequired
}
