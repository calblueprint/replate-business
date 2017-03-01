/**
 * @prop buttonText  - list of buttons' text
 * @prop onClicks    - list of buttons' functions for OnClick
 * @prop header      - header string
 * @prop detail      - detail string
 * @prop metadata    - to be passed to onClick functions
 * @prop showModal   - boolean indicating whether modal should be shown
 * @prop hideModal   - func which sets showModal to false in parent
 */
class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  _submitButton = (e) => {
  	let target = $(e.target);
    let i = target.attr('data-index');
    this.props.onClicks[i](this.props.metadata);
    this.props.hideModal();
  }

  render() {
  let buttons = this.props.buttonText.map((text, i) => {
  	return <button className="button submit-button marginRight-xs" key={i} data-index={i} onClick={this._submitButton}>{text}</button>
  });
	return <Modal show={this.props.showModal} onHide={this.close} className="pickup-creation-modal">
		<Modal.Header>
		  <h1 className="modal-title">{this.props.header}</h1>
		</Modal.Header>
		<Modal.Body>
			<label>{this.props.detail}</label>
		</Modal.Body>
		<Modal.Footer>
			<button className="button button--text-black marginRight-xs pull-left" onClick={this.props.hideModal}>Cancel</button>
			{buttons}
		</Modal.Footer>
	</Modal>
	}
}