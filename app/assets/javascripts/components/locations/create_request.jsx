/**
 * @prop location_id - id associated with the current location
 * @prop success      - function handler for successful student creation
 */
class RequestCreationForm extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = { location_id : this.props.location_id };
        this._focusInputField()
    }

    _attemptCreate = (e) => {
        // const success = (msg) => {
        //     // Hacky workaround to clear component state
        //     $(".modal-dialog input").reactClear();
        //     $(React.findDOMNode(this.refs.modal)).modal("hide");
        //     this.props.success();
        // }
        // this._attemptAction(APIConstants.requests.create, this._formFields(),
        //     success);
    }

    render() {
        return (
            <div className="action-item create-item">
                <div data-toggle="modal" data-target="#newRequestModal" >
                    <form className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Create New Request</h4>
                        </div>
                        <div className="modal-body">
                            <fieldset className="input-container name-container">
                                <label>Title</label>
                                <input type="text" placeholder="Add a title" ref="focus" name="title" onChange={this._handleChange} />
                            </fieldset>

                            <fieldset className="input-container name-container">
                                <label>Caterer</label>
                                <input type="text" placeholder="Add a caterer" name="comment" onChange={this._handleChange} />
                            </fieldset>

                            <fieldset className="input-container name-container">
                                <label>Food Type</label>
                                <select name="food-type" onChange={this._handleChange}>
                                    <option value="" disabled defaultValue>Add a food type</option>
                                    <option value="0">Raw</option>
                                    <option value="1">Catered</option>
                                    <option value="2">Baked Goods</option>
                                    <option value="3">Packaged</option>
                                </select>
                            </fieldset>

                            <RecurrenceCreationModule recurrence    = {this.state} />

                            <fieldset className="input-container name-container">
                                <label>Comments</label>
                                <textarea placeholder="Add a comment" name="comment" rows="10" cols="50" onChange={this._handleChange} />
                            </fieldset>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="button" data-dismiss="modal">Cancel</button>
                            <button type="submit" name="submit" value="Create Request" className="submit-button" onClick={this._attemptCreate}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

RequestCreationForm.propTypes = {
    location_id : React.PropTypes.number.isRequired,
    // success      : React.PropTypes.func.isRequired
};