class LocationInvoice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			showModal: false,
			useSaved: false,
			business: {},
			totalCharge: 0,
			
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
			console.log(card);
			this.card = card;
			//this.setState({card: card});

			card.mount('#card-element');
		}
	}

	_closeModal = () => {
		this.setState({showModal: false});
	}

	_openModal = () => {
    this.setState({ showModal: true });

  }

	_handleSubmit = () => {
		console.log(this.card);
		var form = this;
		var state = this.state;
		if (this.state.useSaved) {
			const taskUpdateSuccess = (response) => {
		    	this._fetchTasks();
		  }
		  
			paySuccess = (response) => {
		    Requester.update(APIConstants.locations.tasks(this.props.location.id),{}, taskUpdateSuccess);
	    }
	   
	    Requester.post(APIConstants.businesses.charge(state.business.id),{useSaved: this.state.useSaved, chargeAmount: this.state.tasks.length * 30},paySuccess); 
	    form._closeModal();
		}
		else {
		
			this.stripe.createToken(this.card).then(function(result) {
		    if (result.error) {
		      // Inform the user if there was an error
		      var errorElement = document.getElementById('card-errors');
		      errorElement.textContent = result.error.message;
		    } else {
		      // Send the token to your server
		    	const taskUpdateSuccess = (response) => {
		    		form._fetchTasks();
		    	}
		    	
		    	updateBusiness = (response) => {
		    		Requester.update(APIConstants.locations.tasks(form.props.location.id),{},taskUpdateSuccess);
		    		if (response.stripe_customer_id != null) {
		    			Requester.update(APIConstants.businesses.update(state.business.id),{stripe_customer_id: response.stripe_customer_id});
		    		}
		    	}
		    	Requester.post(APIConstants.businesses.charge(state.business.id),{stripeToken:result.token.id, useSaved: state.useSaved, chargeAmount: state.tasks.length * 30},updateBusiness); //always charge with id
		    	form._closeModal();
		      //stripeTokenHandler(result.token);
		    }
		  });
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
		Requester.get(APIConstants.locations.tasks(this.props.location.id), setTasks);
		Requester.get(APIConstants.businesses.show(this.props.business.id), setBusiness);

	}

	_useOldCard = (e) => {
		this.setState({useSaved: e.target.checked});
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
		//this.setState({totalCharge:totalCharge})
	}

	render() {
		

	
		return (
			<div>
				{this.state.tasks.map((tsk) =>
				  <div key = {tsk.id}>Task {tsk.id} was {tsk.status} and {tsk.paid ? 'paid for.' : 'not paid for.'}</div>
				)}
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
        onHide={this._closeModal}
        
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
							We've detected you have a saved card. Would you like to pay with this card?
							

						<input
            name="useSaved"
            type="checkbox"
            checked={this.state.useSaved}
            onChange={this._useOldCard}
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
			</div>
			);
	

		
	}
}
LocationInvoice.propTypes = {
  location : React.PropTypes.object.isRequired,
  business : React.PropTypes.object.isRequired,
 };