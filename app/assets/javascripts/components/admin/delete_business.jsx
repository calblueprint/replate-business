/**
 * @prop business - the business object to delete
 */
class DeleteBusinessModal extends DefaultModal {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _handleBusinessDelete = () => {
    const success = () => {
      window.location = "/admin_dashboard";
    }

    this.setState({ loading: true, });
    Requester.delete(APIConstants.businesses.update(this.props.business.id), success)
  }

  render() {
    let loading;

    if (this.state.loading) {
      loading =
        <div className="loading-container">
          <div className="loading"></div>
        </div>
    }

    return (
      <div>
        <button className="button button--text-alert" onClick={this.openModal}>
          Delete Business
        </button>
        <Modal
          className="delete-location-modal"
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          {loading}
          <Modal.Header>
            <Modal.Title>Delete Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {this.props.business.company_name}?
             All Locations and pickup data and history will be lost.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button button--text-black"
              onClick={this.closeModal}
            >No, don't delete</button>
            <button
              className="button button--alert marginLeft-sm"
              onClick={this._handleBusinessDelete}
            >Yes, delete</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteBusinessModal.propTypes = {
  business: React.PropTypes.object,
}
