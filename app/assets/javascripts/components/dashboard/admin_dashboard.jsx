/**
 * Renders the home admin dashboard view
 * @prop admin - the current admin that is signed in
 * @prop business_id
 */

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }



  render() {
    let locs;
    locs = this.props.business_ids.map((id) => {
      return (
        <BusinessDashboard
          business_id = {id} />
        )
      })

    return(
      <div>
      {locs}
      </div>
    )
  }
}


AdminDashboard.propTypes = {
  business_id: React.PropTypes.number.isRequired
}
