var Modal = ReactBootstrap.Modal;

class DefaultModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }
}
