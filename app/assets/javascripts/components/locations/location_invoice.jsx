class LocationInvoice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			showModal: false,
			
		}
		this._handleSubmit = this._handleSubmit.bind(this);
	}
	componentWillMount() {
		this._fetchTasks();
	}
	componentDidMount() {
		
		
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
		this.stripe.createToken(this.card).then(function(result) {
	    if (result.error) {
	      // Inform the user if there was an error
	      var errorElement = document.getElementById('card-errors');
	      errorElement.textContent = result.error.message;
	    } else {
	      // Send the token to your server
	      console.log("done");
	      console.log(result.token);
	    	
	    	updateBusiness = (response) => {
	    		console.log("hi");
	    		console.log(response);
	    		if (response.stripe_customer_id != null) {
	    			console.log("entere");
	    			const success = (response) => {
	    				console.log(response);
	    				console.log("business updated");
	    			}
	    			Requester.update(APIConstants.businesses.update(state.business.id),{stripe_customer_id: response.stripe_customer_id},success);
	    		}
	    	}
	    	Requester.post(APIConstants.businesses.charge(state.business.id),{stripeToken:result.token.id},updateBusiness);
	    	form._closeModal();
	      //stripeTokenHandler(result.token);
	    }
	  });

	}

	_fetchTasks = () => {
		setTasks = (response) => {
			console.log("hi");
			var arr = [];
			for (prop in response) {
			  arr.push(response[prop]);
			}
			console.log(arr);
			this.setState({tasks: arr});
				
		}
		setBusiness = (response) => {
			this.setState({business: response});
		}
		console.log(this.props.location);
		Requester.get(APIConstants.locations.tasks(this.props.location.id), setTasks);
		Requester.get(APIConstants.businesses.show(this.props.business.id), setBusiness);

	}

	render() {
		

	
		return (
			<div>
				{this.state.tasks.map((tsk) =>
				  <div key = {tsk.id}>Task {tsk.id} was {tsk.status}</div>
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
					You owe {this.state.tasks.length * 30} dollars for the current invoice.
				</div>
				</Modal.Header>
				<Modal.Body>
					<div id = "card-element">
					</div>

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
	

		return (

			<div> hi </div>

			)
	}
}
LocationInvoice.propTypes = {
  location : React.PropTypes.object.isRequired,
  business : React.PropTypes.object.isRequired,
 };