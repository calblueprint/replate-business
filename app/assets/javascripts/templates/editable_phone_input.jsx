/**
 * @prop label        - label of field to show
 * @prop name         - name of input component
 * @prop data         - current input for label
 * @prop editable     - true if fields are editable
 * @prop handleChange - callback function when form inputs change
 */
class EditablePhoneInput extends React.Component {

  _checkTextSelected = (input) => {
    return input.selectionStart !== input.selectionEnd;
  }

  _handleInput = (e) => {

    // Validate the input to allow numbers only
    let entry = parseInt(e.key);
    if (!entry && entry != 0) {
      e.preventDefault();
    }

    // If the user has selected text, resume default behavior
    if (this._checkTextSelected(e.target)) {
      return true;
    }

    let input = e.target.value;
    let rawNum = input.split("-").join("");
    let formattedNum;

    if (rawNum.length >= 10) {
      e.preventDefault();
      return;
    }

    if (rawNum.length == 3) {
      formattedNum = rawNum + "-";
    } else if (rawNum.length > 3 && rawNum.length < 6) {
      formattedNum = rawNum.substring(0, 3) + "-" + rawNum.substring(3, rawNum.length);
    } else if (rawNum.length >= 6) {
      formattedNum = rawNum.substring(0, 3) + "-" + rawNum.substring(3, 6);
      formattedNum += "-" + rawNum.substring(6, rawNum.length);
    } else {
      formattedNum = rawNum;
    }

    this._setInputVal(e.target, formattedNum);
  }

  _setInputVal = (input, value) => {
    input.value = value;
  }

  render() {
    let inputVal;
    if (this.props.editable) {
      inputVal = (
        <input type="tel" name={this.props.name}
          id={this.props.input_id} className="input"
          onChange={this.props.handleChange}
          onKeyPress={this._handleInput}
          defaultValue={this.props.data} />
      );
    } else {
      inputVal = this.props.data;
    }

    let labelVal;
    if (this.props.label) {
      labelVal = (
        <label htmlFor={this.props.label}
          className="label label--newline">
          { this.props.label }:
        </label>
      );
    }

    return (
      <fieldset className="input-container">
        <div className="editable-input-label-container">
          { labelVal }
        </div>
        <div className="editable-input-box-container">
          { inputVal }
        </div>
      </fieldset>
    );
  }
}

EditableInput.propTypes = {
  data         : React.PropTypes.string,
  label        : React.PropTypes.string.isRequired,
  name         : React.PropTypes.string.isRequired,
  editable     : React.PropTypes.bool.isRequired,
  handleChange : React.PropTypes.func.isRequired
};
