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
    const imageBusiness = //pic business

    return(
      
    )

    }
  }
}
