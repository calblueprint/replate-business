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

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
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
          onEntered={() => {this.emailInput.focus()}}
        >
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <form
            action="businesses/sign_in" method="post">
            <Modal.Body>
              <div className="input-container marginBot-sm">
                <label
                  className="label label--newline"
                  htmlFor="email-input"
                >Email Address</label>
                <input
                  className="input input--fullwidth"
                  id="email-input"
                  name="business[email]"
                  type="email"
                  placeholder="example@email.com"
                  onChange={this._handleChange}
                  onKeyDown={this._handleKeydown}
                  ref={(input) => { this.emailInput = input; }}
                />
              </div>
              <div className="input-container">
                <label
                  className="label label--newline"
                  htmlFor="password-input"
                >Password</label>
                <input
                  className="input input--fullwidth"
                  id="password-input"
                  name="business[password]"
                  type="password"
                  onChange={this._handleChange}
                  onKeyDown={this._handleKeydown}
                />
                <input
                  type="hidden"
                  name="authenticity_token"
                  value={this._getToken()}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="button button--text-black"
                onClick={this._closeModal}
              >Close</button>
              <input
                type="submit"
                className="button marginLeft-sm"
                value="Log In"
              />
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

HomeLogin.propTypes = { btnClasses: React.PropTypes.string };
HomeLogin.defaultProps = { btnClasses: "button--white" };
