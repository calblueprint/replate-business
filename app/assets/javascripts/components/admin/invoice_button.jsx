/**
 * Renders the home business dashboard view
 * @prop business_id - the current business that is signed in
 */
class InvoiceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {},
    };
  }

  componentDidMount() {
    this._fetchBusinessData();
  }


  _fetchBusinessData = () => {
    const success = (data) => {
      this.setState({ business: data });
    }
    Requester.get(APIConstants.businesses.update(
      this.props.business_id), success);
  }

   handleClick = () => {
    var invoiceUrl = window.location.href;
    invoiceUrl = invoiceUrl.split('/').slice(0,-1).join('/')

  }


  render() {
      return (
        <button onClick={this.handleClick} type="button" className="button new-location-button">
          Create Invoice
        </button>
        )

  }
}


