/**
 * Renders the home admin dashboard view
 * @prop admin - the current admin that is signed in
 * @prop business_ids - array of businesses ids
 */

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }

  render() {
    let businesses;

    businesses = this.props.business_ids.map((id) => {
      return (
        <div>
        <InvoiceButton
          business_id = {id} />
        <BusinessDashboard
          business_id = {id} />
          </div>
        )
      })

    return(
      <div>
        {businesses}
      </div>
    )
  }
}

AdminDashboard.propTypes = {
  business_ids: React.PropTypes.array.isRequired
}
