/**
 * @prop request_id - id associated with the current request
 * @prop success      - function handler for successful recurrence creation
 */
class RecurrenceCreationModule extends DefaultForm {

	constructor(props) {
		super(props);
	}

	_toggleDay = (e) => {
		var day = e.target.id;
		if (this.state[day] === "day-active") {
			var val = "";
		} else {
			var val = "day-active";
		}
		var state  = {};
		state[day] = val;
		this.setState( state );
	}

	render() {
		return (
			<div className="action-item create-item recurrence-container">
				<div className="week-container">
					<div className={`day-item ` + this.state.monday} id="monday" onClick={this._toggleDay}>Monday</div>
					<div className={`day-item ` + this.state.tuesday} id="tuesday" onClick={this._toggleDay}>Tuesday</div>
					<div className={`day-item ` + this.state.wednesday} id="wednesday" onClick={this._toggleDay}>Wednesday</div>
					<div className={`day-item ` + this.state.thursday} id="thursday" onClick={this._toggleDay}>Thursday</div>
					<div className={`day-item ` + this.state.friday} id="friday" onClick={this._toggleDay}>Friday</div>
				</div>
			</div>
		);
	}
}

RequestCreationModal.propTypes = {
	request_id : React.PropTypes.number.isRequired,
	success      : React.PropTypes.func.isRequired
};