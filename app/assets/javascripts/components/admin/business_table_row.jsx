/**
 *
 */
class BusinessTableRow extends React.Component {

  constructor(props) {
    super(props);
  }

  linkToProfile() {
    const id = this.props.business.id;
    window.location = APIConstants.admin.businessProfile(id);
  }

  render () {
    const { business } = this.props;
    
    return (
      <tr onClick={() => this.linkToProfile()}>
        <td>{business.company_name}</td>
        <td>{business.email}</td>
        <td>{business.phone}</td>
        <td>False</td>
      </tr>
    );
  }
}

BusinessTableRow.propTypes = {
  business: React.PropTypes.object,
}
