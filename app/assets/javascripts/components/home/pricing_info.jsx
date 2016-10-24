/**
 * Allows business to view different pricing plans
 */
class PricingInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 1 };
  }

  _togglePricing = (newTab) => {
    this.setState({ activeTab: newTab })
  }

  render() {
    let pricingDetails;
    if (this.state.activeTab == 0) {
      pricingDetails = <PricingCards prices = {[20, 30, 50]} />
    } else if (this.state.activeTab == 1) {
      pricingDetails = <PricingCards prices = {[30, 40, 60]} />
    } else {
      pricingDetails = <PricingCards prices = {[40, 50, 70]} />
    }

    return (
      <div>
        <ul className="pricing-toggle-container">
          <PricingToggle update    = {this._togglePricing}
                         title     = "Small office"
                         caption   = "1-50 employees"
                         toggleID  = {0}
                         activeTab = {this.state.activeTab} />
          <PricingToggle update    = {this._togglePricing}
                         title     = "Medium office"
                         caption   = "50-100 employees"
                         toggleID  = {1}
                         activeTab = {this.state.activeTab} />
          <PricingToggle update    = {this._togglePricing}
                         title     = "Large office"
                         caption   = "100+ employees"
                         toggleID  = {2}
                         activeTab = {this.state.activeTab} />
        </ul>

        { pricingDetails }
      </div>
    )
  }
}


/**
 * Allows plans to be toggled through
 * @prop update    - callback function to change state
 * @prop title     - title for the tab
 * @prop caption   - caption for the tab
 * @prop toggleID  - ID for the tab
 * @prop activeTab - which ID is active in the parent module
 */
class PricingToggle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let selected = this.props.activeTab == this.props.toggleID;
    return (
      <li className={`pricing-toggle toggle-` + selected}
          onClick={this.props.update.bind(this, this.props.toggleID)}>
        <h2 className="pricing-category">{this.props.title}</h2>
        <h3 className="pricing-category-desc">{this.props.caption}</h3>
      </li>
    )
  }
}

/**
 * Shows the pricing cards
 * @prop prices - array of prices
 */
class PricingCards extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pricing-cards-container">
        <div className="pricing-card">
          <h1 style={{background: "#42bdd1"}} className="price-name">Standard</h1>
          <h2 className="price-num">{this.props.prices[0]}</h2>
          <p className="price-detail">per pickup</p>
          <p className="price-paragraph">Our drivers will transport your food to a local nonprofit.</p>
        </div>
        <div className="pricing-card">
          <h1 style={{background: "#67caa2"}} className="price-name">Pro</h1>
          <h2 className="price-num">{this.props.prices[1]}</h2>
          <p className="price-detail">per pickup</p>
          <p className="price-paragraph">In addition to transporting your food, our driver will also help you pack.</p>
        </div>
        <div className="pricing-card">
          <h1 style={{background: "#7cc968"}} className="price-name">Premium</h1>
          <h2 className="price-num">{this.props.prices[2]}</h2>
          <p className="price-detail">per pickup</p>
          <p className="price-paragraph">Transporting, packing and cleaning up your kitchen area.</p>
        </div>
      </div>
    )
  }
}
