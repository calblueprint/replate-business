var Modal = ReactBootstrap.Modal;

/**
 * @prop btnClasses - classes to customize button
 */
class HomeLogin extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  _openModal = () => {
    this.setState({ showModal: true });
  }

  _closeModal = () => {
    this.setState({ showModal: false });
  }

  _handleLogin = (e) => {
    /* Write code to handle login here */
    console.log("Handling login...");
  }

  _handleKeydown = (e) => {
    if (e.which == 13) {
      this._handleLogin();
    }
  }

  render() {
    return (
      <div>
        <button
          className={`button ${this.props.btnClasses} splash-login-button`}
          onClick={this._openModal}
        >Log In</button>
        <Modal
          bsSize="small"
          className="login-modal"
          show={this.state.showModal}
          onHide={this._closeModal}
        >
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="input-container marginBot-sm">
                <label
                  className="label--newline"
                  htmlFor="email-input"
                >Email Address</label>
                <input
                  className="input input--fullwidth"
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={this._handleChange}
                  onKeyDown={this._handleKeydown}
                />
              </div>
              <div className="input-container">
                <label
                  className="label--newline"
                  htmlFor="password-input"
                >Password</label>
                <input
                  className="input input--fullwidth"
                  id="password-input"
                  name="password"
                  type="password"
                  onChange={this._handleChange}
                  onKeyDown={this._handleKeydown}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="button button--text-black"
                onClick={this._closeModal}
              >Close</button>
              <button
                type="submit"
                className="button marginLeft-sm"
                onClick={this._handleLogin}
              >Log In</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

HomeLogin.propTypes = { btnClasses: React.PropTypes.string };
HomeLogin.defaultProps = { btnClasses: "button--white" };
