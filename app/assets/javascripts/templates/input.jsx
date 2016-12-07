/**
 * @prop type     - String input type
 * @prop update   - function for updating input state in parent
 * @prop initData - saved data associated with this input
 * @prop name     - String name of input
 * @prop label    - String label for input
 */
class ValidationInput extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _updateState = (e) => {
    this._handleChange(e);
    let target = $(e.target);
    console.log(target.val());
    this.props.update(target.attr('name'), target.val(), this.state.day);
  }

  render() {
    if (this.state[this.props.name] == "") {
      this.state.validated = false;
    } else if (this.state[this.props.name] != undefined) {
      this.state.validated = true;
    }
    let symbol;
    if (this.state.validated == true) {
      symbol = <i className="fa fa-check-circle" aria-hidden="true"></i>
    } else if (this.state.validated == false) {
      symbol = <i className="fa fa-times-circle" aria-hidden="true"></i>
    }
    return (
      <fieldset className="input-container name-container">
        <label>{this.props.title}</label>
        <input type={this.props.type} defaultValue={this.state[this.props.name]} name={this.props.name} onChange={this._updateState}/>
        {symbol}
      </fieldset>
    );
  }
}

ValidationInput.propTypes = {
  type     : React.PropTypes.string.isRequired,
  initData : React.PropTypes.object.isRequired,
  update   : React.PropTypes.func.isRequired,
  name     : React.PropTypes.string.isRequired,
  title    : React.PropTypes.string.isRequired,
};
