/** Component to render location donation history
 * @prop location - location object
 */
class LocationInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      showModal: false,
      useSavedBusinessCard: false,
      useSavedLocationCard: false,
      business: {},
      location: {},
      nextStep: false,
      stripeToken:null,
      storeLocationCard:false,
      storeBusinessCard:false,
      card: {},
      unpaidTasks: 0,
      chargeAmount: 0,
      
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }

    componentWillMount() {
    this._fetchTasks();
  }
  
  componentDidUpdate() {
    if (this.state.showModal) {
      const stripe = Stripe('pk_live_hAhjglc2Ex4zqKzpHslPr2C8');
      this.stripe = stripe;
      const elements = stripe.elements();
      var card = elements.create('card');
      this.card = card;
      card.mount('#card-element');
      if (this.state.useSavedLocationCard || this.state.useSavedBusinessCard) {
        card.unmount();
      }
    }
    
  }

  _closeModal1 = () => {
    this.setState({showModal: false});
  }

  _closeModal2 = () => {
    this.setState({nextStep: false});
  }

  _openModal = () => {
    this.setState({ showModal: true });
    this._calculateChargeAmount();

  }

  _handleSubmit = () => {
    var form = this;
    var state = this.state;
    if (this.state.useSavedBusinessCard || this.state.useSavedLocationCard) {
      form._closeModal1();
      form.setState({nextStep:true});
    }
    else {
      this.stripe.createToken(this.card).then(function(result) {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {

          const taskUpdateSuccess = (response) => {
            form._fetchTasks();
          }
          
          updateBusiness = (response) => {
            Requester.update(APIConstants.locations.tasks(form.props.location.id),{},taskUpdateSuccess);
            if (response.stripe_customer_id != null) {
              Requester.update(APIConstants.businesses.update(state.business.id),{stripe_customer_id: response.stripe_customer_id});
            }
          }
          form._closeModal1();
          form.setState({nextStep:true});
          form.setState({stripeToken:result.token.id});
        }
      });
    }
  }

  _handleCharge = () => {
    var chargeAmount = this.state.chargeAmount;
    const updateSuccess = (response) => {
      var text = document.createTextNode('Payment succeeded.');
      var child = document.getElementsByClassName('modal-footer');
      child = child[child.length - 1];
      child.parentNode.insertBefore(text, child);
      this._calculateChargeAmount();
      this._fetchTasks();
      this.setState({useSavedBusinessCard: false,
      useSavedLocationCard: false,storeLocationCard:false,
      storeBusinessCard:false,});
      setTimeout(() => 
        { this._closeModal2();
          this.setState({useSavedBusinessCard: false,
      useSavedLocationCard: false,storeLocationCard:false,
      storeBusinessCard:false,});
      },2000);
      
    }
    updateBusiness = (response) => {
      Requester.update(APIConstants.locations.tasks(this.props.location.id),{},updateSuccess);
      if (response.stripe_customer_id != null) {
        Requester.update(APIConstants.businesses.update(this.state.business.id),{stripe_customer_id: response.stripe_customer_id});
      }
    }
    updateLocation = (response) => {
      Requester.update(APIConstants.locations.tasks(this.props.location.id),{},updateSuccess);
      if (response.stripe_customer_id != null) {
        Requester.update(APIConstants.locations.update(this.state.location.id),{stripe_customer_id: response.stripe_customer_id});
      }
    }

    updateBoth = (response) => {
      Requester.update(APIConstants.locations.tasks(this.props.location.id),{},updateSuccess);
      if (response.stripe_customer_id != null) {
        Requester.update(APIConstants.businesses.update(this.state.business.id),{stripe_customer_id: response.stripe_customer_id});
        Requester.update(APIConstants.locations.update(this.state.location.id),{stripe_customer_id: response.stripe_customer_id});

      }
    }
    updateFailed = (response) => {
      var text = document.createTextNode('Payment failed. Please check your payment info or try another card.');
      var span = document.createElement("span");
      span.appendChild(text);
      var child = document.getElementsByClassName('modal-body');
      child = child[child.length - 1];
      span.setAttribute('class', 'validation-msg marginTop-xxl');
      if (child.childNodes.length <= 3) {
        child.appendChild(span);
      }
      this.setState({useSavedBusinessCard: false,
      useSavedLocationCard: false,storeLocationCard:false,
      storeBusinessCard:false,});
    }

    if (this.state.storeBusinessCard && !this.state.storeLocationCard) {
          
      Requester.post(APIConstants.businesses.charge(this.state.business.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: chargeAmount},updateBusiness,updateFailed);
    }

    if (this.state.storeLocationCard && !this.state.storeBusinessCard) {
        Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: chargeAmount},updateLocation,updateFailed);
        this._fetchTasks();
      
    }
    if (this.state.storeLocationCard && this.state.storeBusinessCard) {
      Requester.post(APIConstants.businesses.charge(this.state.business.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: chargeAmount},updateBoth,updateFailed);

    }

    if (this.state.useSavedBusinessCard) {
      Requester.post(APIConstants.businesses.charge(this.state.business.id),{stripeToken:this.state.stripeToken, store:false, useSaved: true, chargeAmount: chargeAmount},updateBusiness,updateFailed);
      
    }

    if (this.state.useSavedLocationCard) {
      Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, store:false, useSaved: true,  chargeAmount: chargeAmount},updateLocation,updateFailed);
      
    }
    if (!(this.state.storeBusinessCard || this.state.storeLocationCard || this.state.useSavedLocationCard || this.state.useSavedBusinessCard)) {
      Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, useSaved: false, store:false, chargeAmount: chargeAmount},updateLocation,updateFailed);
    }

  }

  _fetchTasks = () => { 
    setTasks = (response) => {    
      var arr = [];
      for (prop in response) {
        arr.push(response[prop]);
      } 
      this.setState({tasks: arr});  
      this._calculateChargeAmount();  
    }
    setBusiness = (response) => {
      this.setState({business: response});    
    }
    setLocation = (response) => {
      this.setState({location: response});
    }   
    Requester.get(APIConstants.locations.tasks(this.props.location.id), setTasks);
    Requester.get(APIConstants.locations.show(this.props.location.id), setLocation);
    Requester.get(APIConstants.businesses.show(this.props.business.id), setBusiness);

  }

  _useOldBusinessCard = (e) => {
    this.setState({useSavedBusinessCard: e.target.checked});
  }
  _useOldLocationCard = (e) => {
    this.setState({useSavedLocationCard: e.target.checked});
  }
  _storeLocationCard = (e) => {
    this.setState({storeLocationCard: e.target.checked});
  }
  _storeBusinessCard = (e) => {
    this.setState({storeBusinessCard: e.target.checked});
  }


  _calculateChargeAmount = () => {
    var unpaidTasks = 0;
    var totalCharge = 0;
    var costPerCharge = 30;
    if (this.state.location.is_large) {
      costPerCharge = 40;
    }
    for (var a = 0; a < this.state.tasks.length; a++) {
      if (!this.state.tasks[a].paid) {
        unpaidTasks++;
        totalCharge+=costPerCharge
      }
    }
    this.setState({chargeAmount:totalCharge});
    this.setState({unpaidTasks:unpaidTasks});
    
  }

  render() {
    let emptyState;
    if (this.state.tasks.length == 0) {
      emptyState = (
        <div className="empty-table-container">
          <h1>No previous pickups yet!</h1>
        </div>
      );
    }

    const history = this.state.tasks.map((item, index) => {
      return (
        <HistoryRow item = {item}
                    key  = {index} />
      );
    });

    return (
      <div className="row">
        <div className="col-md-8">
          <h1 className="history-title marginBot-md">Donation History</h1>
          <div className="history-table-container">
            { emptyState }
            <table className="table history-table">
              <thead>
                <tr>
                  <th className="table-header">Date</th>
                  <th className="table-header">Paid</th>
                  
                </tr>
              </thead>
              <tbody>
                { history }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <h1 className="history-title marginBot-md">More Info</h1>
          <div className="stats-container">
            You've donated { this.state.tasks.length } { this.state.tasks.length > 1 ? `times` : `time` }!
          </div>
          <div>
          You have { this.state.unpaidTasks } unpaid { this.state.unpaidTasks > 1 ? `pickups` : `pickup` }.
          </div>
          <div> 
          Your price per pickup is {this.state.location.is_large ? '$40' : '$30'} because this location has {this.state.location.is_large ? '> 100' : '< 100'} employees.
          </div>
          <div className="history-button-container marginTop-md">
            <button
              type="button"
              className="button"
              onClick={this._openModal}
              >Pay Invoice with Stripe
            </button>
          </div>
        </div>
        <Modal
          bsSize="small"
          className="pickup-creation-modal"
          show={this.state.showModal}
          onHide={this._closeModal1}>
        <Modal.Header>
        <div className="form-row">
          <Modal.Title>Credit/Debit Card</Modal.Title>
          <br></br>
          You owe {this.state.chargeAmount} dollars for the current invoice.
        </div>
        </Modal.Header>
        <Modal.Body>
          <div id="card-element"/>
          {this.state.business.stripe_customer_id && 
            <div>
              We've detected you have a saved card for this business. Would you like to pay with this card?
              

            <input
            name="useSavedBusinessCard"
            type="checkbox"
            checked={this.state.useSavedBusinessCard}
            onChange={this._useOldBusinessCard}
            />
            Yes
            </div>
            
          }
          {this.state.location.stripe_customer_id && 
            <div>
              We've detected you have a saved card for this location. Would you like to pay with this card?
              

              <input
              name="useSavedLocationCard"
              type="checkbox"
              checked={this.state.useSavedLocationCard}
              onChange={this._useOldLocationCard}
              />
            Yes
            </div>
            
          }

          <div id="card-errors"></div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="button button--text-black"
            onClick={this._closeModal1}
          >Close</button>
          <button
            type="button"
            className="button marginLeft-sm"
            onClick={this._handleSubmit}
          >Submit Payment</button>
        </Modal.Footer>
        </Modal>

        <Modal
        bsSize="small"
        className="ezt"
        show={this.state.nextStep}
        onHide={this._closeModal2}
        >
        <Modal.Header>
        <div className="form-row">
          <label htmlFor="card-element"/>
          <Modal.Title>Payment Confirmation</Modal.Title>
          <br></br>
          Pay {this.state.chargeAmount} dollars for the current invoice.
        </div>
        </Modal.Header>
        <Modal.Body>
          {!(this.state.useSavedLocationCard) && this.state.location.email && !(this.state.useSavedBusinessCard) &&
            <div>  
              <input
                name="storeLocationCard"
                type="checkbox"
                checked={this.state.storeLocationCard}
                onChange={this._storeLocationCard}
              />
              Set this card as the default payment for this location 
            </div>
          }
          {!(this.state.useSavedBusinessCard) && !(this.state.useSavedLocationCard) &&
            <div className="small-msg">
              <input
                name="storeBusinessCard"
                type="checkbox"
                checked={this.state.storeBusinessCard}
                onChange={this._storeBusinessCard}
              />
              Set this card as the default payment for {this.state.business.company_name}
            </div> 
          }
          {!this.state.location.email && !(this.state.useSavedLocationCard) && !(this.state.useSavedBusinessCard) &&
            <div className="info-msg marginTop-xs">
              Your location does not have an email associated with it, so a card cannot be saved to this location. Add an email to this location in "Settings".
            </div>
          }

          <div id="card-errors"></div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="button button--text-black"
            onClick={this._closeModal2}
          >Close</button>
          <button
            type="button"
            className="button marginLeft-sm"
            onClick={this._handleCharge}
          >Confirm Payment</button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

/**
 * History Item component
 * @prop item - details of item
 */
class HistoryRow extends React.Component {
  render() {
    return (
      <tr className="table-row history-row">
        <td className="history-date-col">
          { moment(this.props.item.scheduled_date).format('LLL') }
        </td>
        <td className={`history-status ` + this.props.item.paid}>
          { this.props.item.paid ? "Paid" : "Unpaid" }
        </td>
        
      </tr>
    );
  }
}
