/**
 * @prop location_id - id associated with the current location
 * @prop success     - function handler for successful student creation
 */
class RequestCreationForm extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { location_id : this.props.location_id };
  }

  _attemptCreate = (e) => {
    const success = (data) => {
      this.props.success();
      this.close();
    }
    this._attemptAction(APIConstants.requests.create, this.state, success, success);
  }

  open = (e) => {
    this.setState({ showModal: true });
  }

  close = (e) => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="action-item create-item">
        <div data-toggle="modal fade" data-target="#newRequestModal" >
          <button onClick={this.open} type="button" className="submit-button-o button-small">
            <span className="fa fa-plus" />
            Create a new request
          </button>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
          <div className="modal-header">
            <h3 className="modal-title">Create New Request</h3>
          </div>
          </Modal.Header>
          <Modal.Body>
          <form className="modal-content">
            <div className="modal-body">
              <fieldset className="input-container name-container">
                <label>Title</label>
                <input type="text" placeholder="Add a title" ref="focus" name="title" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>Caterer</label>
                <input type="text" placeholder="Add a caterer" name="caterer" onChange={this._handleChange} />
              </fieldset>

              <fieldset className="input-container name-container">
                <label>Food Type</label>
                <select name="food_type" onChange={this._handleChange}>
                  <option value="" disabled selected>Add a food type</option>
                  <option value="raw">Raw</option>
                  <option value="catered">Catered</option>
                  <option value="baked_goods">Baked Goods</option>
                  <option value="packaged">Packaged</option>
                </select>
              </fieldset>

              <RecurrenceCreationModule/>

              <fieldset className="input-container name-container">
                <label>Comments</label>
                <textarea placeholder="Add a comment" name="comments" rows="10" cols="50" onChange={this._handleChange} />
              </fieldset>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
          <div className="modal-footer">
            <button type="button" className="button" onClick={this.close}>Cancel</button>
            <button type="submit" name="submit" value="Create Request" className="submit-button" onClick={this._attemptCreate}>Create</button>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

RequestCreationForm.propTypes = {
  location_id : React.PropTypes.number.isRequired,
  success     : React.PropTypes.func.isRequired
};
