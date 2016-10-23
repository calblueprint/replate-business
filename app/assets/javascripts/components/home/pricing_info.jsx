/**
 * Allows business to view different pricing plans
 */
class PricingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "single" };
  }

  _togglePricing = (newTab) => {
    this.setState({ activeTab: newTab })
  }


  render() {
    let pricingDetails;
    if (this.state.activeTab == "single") {
      pricingDetails = <div>single pricing details</div>
    } else {
      pricingDetails = <div>subscription pricing details</div>
    }

    return (
      <div>
        <ul>
          <li onClick={this._togglePricing.bind(this, "single")}>single pickup</li>
          <li onClick={this._togglePricing.bind(this, "subscription")}>subscription</li>
        </ul>

        <h1>Now showing:</h1>
        { pricingDetails }
      </div>
    )
  }
}
