/**
 * @prop location - the location object to delete
 */
class DeleteLocationModal extends DefaultModal {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _handleLocationDelete = () => {
    const success = () => {
      window.location = "/dashboard";
    }

    this.setState({ loading: true, });
    Requester.delete(APIConstants.locations.update(this.props.location.id), success)
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
          Delete Location
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
            <p>Are you sure you want to delete {this.props.location.addr_name}? All pickup data and history will be lost.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button button--text-black"
              onClick={this.closeModal}
            >No, don't delete</button>
            <button
              className="button button--alert marginLeft-sm"
              onClick={this._handleLocationDelete}
            >Yes, delete</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteLocationModal.propTypes = {
  business: React.PropTypes.object,
}
