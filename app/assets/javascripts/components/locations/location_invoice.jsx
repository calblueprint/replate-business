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
			totalCharge: 0,
			nextStep: false,
			stripeToken:null,
			storeLocationCard:false,
			storeBusinessCard:false,
      card: {},
			
		}
		this._handleSubmit = this._handleSubmit.bind(this);
	}
	componentWillMount() {
		this._fetchTasks();
	}
	
	componentDidUpdate() {
		if (this.state.showModal) {
			const stripe = Stripe('pk_test_efPPBgAwLzezAOkbl7J0fzfu');
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
		const updateSuccess = (response) => {
			this._closeModal2();
		  this._fetchTasks();
			
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

		if (this.state.storeBusinessCard) {
					
			Requester.post(APIConstants.businesses.charge(this.state.business.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: this.state.tasks.length * 30},updateBusiness);
		}

		if (this.state.storeLocationCard) {
			
			if (this.state.storeBusinessCard) {
				Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: 0},updateLocation);
			}
			else {
				Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, store:true, useSaved: false, chargeAmount: this.state.tasks.length * 30},updateLocation);
				this._fetchTasks();
			}
		}

		if (this.state.useSavedBusinessCard) {
			Requester.post(APIConstants.businesses.charge(this.state.business.id),{stripeToken:this.state.stripeToken, store:false, useSaved: true, chargeAmount: this.state.tasks.length * 30},updateBusiness);
			
		}

		if (this.state.useSavedLocationCard) {
			Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, store:false, useSaved: true,  chargeAmount: this.state.tasks.length * 30},updateLocation);
			
		}
		if (!(this.state.storeBusinessCard || this.state.storeLocationCard || this.state.useSavedLocationCard || this.state.useSavedBusinessCard)) {
			Requester.post(APIConstants.locations.charge(this.state.location.id),{stripeToken:this.state.stripeToken, useSaved: false, store:false, chargeAmount: this.state.tasks.length * 30},updateLocation);
		}
	}

	_fetchTasks = () => {	
		setTasks = (response) => {		
			var arr = [];
			for (prop in response) {
			  arr.push(response[prop]);
			}	
			this.setState({tasks: arr});		
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
		var totalCharge = 0;
		var costPerCharge = 30;
		for (var a = 0; a < this.state.tasks.length; a++) {
			if (!this.state.tasks[a].paid) {
				totalCharge+=costPerCharge
			}
		}
		return totalCharge;
	}

	render() {
		

	
		return (
			<div>
				{this.state.tasks.map((tsk) =>
				  <div key = {tsk.id}>Task {tsk.id} was {tsk.status} and {tsk.paid ? 'paid for.' : 'not paid for.'}</div>
				)}

        {this.state.tasks.length == 0 && 
          <div> You have no completed tasks. </div>
        }
				<br>
				</br>
				<button
					type="button"
					className="button button--text-black"
					onClick={this._openModal}
					>Pay Invoice with Stripe
					</button>
				<Modal
        bsSize="small"
        className="pickup-creation-modal"
        show={this.state.showModal}
        onHide={this._closeModal1}
        
      	>
				<Modal.Header>
				<div className="form-row">
					<label htmlFor="card-element">
					Credit/Debit Card
					</label>
					<br></br>
					You owe {this._calculateChargeAmount()} dollars for the current invoice.
				</div>
				</Modal.Header>
				<Modal.Body>
					<div id = "card-element">

					</div>
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
            onClick={this._closeModal}
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
					<label htmlFor="card-element">
					</label>
					<br></br>
					You owe {this._calculateChargeAmount()} dollars for the current invoice.
				</div>
				</Modal.Header>
				<Modal.Body>
					{!this.state.location.email && !(this.state.useSavedLocationCard) && !(this.state.useSavedBusinessCard) &&
						<div>
							Your location has no email, so this card cannot be saved to this location. Add an email to this location in "Settings".

						</div>

					}
					{!(this.state.useSavedLocationCard) && this.state.location.email && !(this.state.useSavedBusinessCard) &&
						<div>
							
							Would you like to store this new credit card as the default card for this location?

						<input
            name="storeLocationCard"
            type="checkbox"
            checked={this.state.storeLocationCard}
            onChange={this._storeLocationCard}
            />
            Yes
						</div>
					}
							{!(this.state.useSavedBusinessCard) && !(this.state.useSavedLocationCard) &&
								<div>
							Would you like to store this new credit card as the default card for your business {this.state.business.company_name}?

						<input
            name="storeBusinessCard"
            type="checkbox"
            checked={this.state.storeBusinessCard}
            onChange={this._storeBusinessCard}
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
LocationInvoice.propTypes = {
  location : React.PropTypes.object.isRequired,
  business : React.PropTypes.object.isRequired,
 };