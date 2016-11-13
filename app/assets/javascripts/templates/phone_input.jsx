/**
 * Component to format phone inputs
 * @prop form_token - Rails token for form submission
 */
class PhoneInput extends React.Component {

  constructor(props) {
    super(props);
  }

  _checkTextSelected = (input) => {
    return input.selectionStart != input.selectionEnd;
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

    this._setInputVal(e.target, formattedNum)
  }

  _setInputVal = (input, value) => {
    input.value = value;
  }

  render() {
    return (
      <div className="field input-container">
        <label className="label--newline">Phone</label>
        <input type='hidden' name='authenticity_token' value={this.props.form_token} />
        <input type="tel" className="input" onKeyPress={this._handleInput} />
      </div>
    )
  }
}

PhoneInput.propTypes = { form_token: React.PropTypes.string };
