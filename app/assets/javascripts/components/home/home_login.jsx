/**
 * @prop btnClasses - classes to customize button
 */
class HomeLogin extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hideErrors: true
    };
  }

  _openModal = () => {
    this.setState({ showModal: true });
  }

  _closeModal = () => {
    this.setState({
      showModal: false,
      hideErrors: true
    });
  }

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  }

  _handleKeydown = (e) => {
    if (e.keyCode == 13) {
      this._handleLogin();
    }
  }

  _handleLogin = () => {
    this.setState({ hideErrors: true, })

    const success = () => {
      window.location = "/dashboard";
    }
    const failure = () => {
      this.setState({hideErrors: false});
    }
    Requester.post(APIConstants.sessions.create, this._formFields(), success, failure);
  }

  // _handleLoginAdmin = () {
    // this.setState({ hidErrors: true})

    // const success = () =>  {
      // window.location = "/admin_dashboard";
    // }
    // const failure = () => {
      // this.setState({hideErrors: false});

    // }
    // Requester.post(APIConstants.sessions.create, this._formFields(), success, failure)
    // }


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

          <Modal.Body>
            <div className="input-container marginBot-sm">
              <label
                className="label label--newline"
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
                name="password"
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
            <div hidden={this.state.hideErrors} className="marginTop-xs login-error-text">
              The email or password you entered doesn't match our records. Please double check and try again!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="button button--text-black"
              onClick={this._closeModal}
            >Close</button>
            <button
              type="button"
              className="button marginLeft-sm"
              onClick={this._handleLogin}
            >Log In</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

HomeLogin.propTypes = { btnClasses: React.PropTypes.string };
HomeLogin.defaultProps = { btnClasses: "button--white" };
