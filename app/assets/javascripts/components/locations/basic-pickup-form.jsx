/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 */
class BasicPickupForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
  }

  _nextStep = (e) => {
    this.props.nextStep(this.state, "basicForm");
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <h3 className="modal-title">New Pickup</h3>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-pickup-form">
            <fieldset className="input-container name-container">
              <label>Title</label>
              <input type="text" placeholder="Add a title" defaultValue={this.state.title} ref="focus" name="title" onChange={this._handleChange} />
            </fieldset>

            <fieldset className="input-container name-container">
              <label>Caterer</label>
              <input type="text" placeholder="Add a caterer" defaultValue={this.state.caterer} name="caterer" onChange={this._handleChange} />
            </fieldset>

            <fieldset className="input-container name-container">
              <label>Food Type</label>
              <select defaultValue={this.state.food_type} name="food_type" onChange={this._handleChange}>
                <option value="" disabled selected>Add a food type</option>
                <option value="raw">Raw</option>
                <option value="catered">Catered</option>
                <option value="baked_goods">Baked Goods</option>
                <option value="packaged">Packaged</option>
              </select>
            </fieldset>

            <fieldset className="input-container name-container">
              <label>Comments</label>
              <textarea placeholder="Add a comment" defaultValue={this.state.comments} name="comments" rows="10" cols="50" onChange={this._handleChange} />
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" name="submit" value="Next Step" className="submit-button" onClick={this._nextStep}>Next</button>
        </Modal.Footer>
      </div>
    );
  }
}

BasicPickupForm.propTypes = {
  initData: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  prevStep: React.PropTypes.func.isRequired,
};
