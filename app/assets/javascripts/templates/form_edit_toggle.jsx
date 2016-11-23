/**
 * @prop editable  - true if fields are editable
 * @prop update    - function to toggle editable mode true/false
 * @prop save      - function to saves the state of the form
 * @prop className - classes to include
 */
class FormEditToggle extends React.Component {

  render() {
    var buttonContainer;
    if (this.props.editable) {
      buttonContainer = (
        <div className="edit-button-container">
          <input name="editable" type="button" value="Cancel"
            className="button button--outline button--sm marginRight-xs"
            onClick={this.props.update} />
          <input type="button" value="Save Changes"
            className="button button--sm" onClick={this.props.save} />
        </div>
      )
    } else {
      buttonContainer = (
        <div className="edit-button-container">
          <input name="editable" type="button" value="Edit"
            className="button button--outline button--sm"
            onClick={this.props.update} />
        </div>
      )
    }
    return (
      <fieldset className={this.props.className}>
        { buttonContainer }
      </fieldset>
    )
  }
}

FormEditToggle.propTypes = {
  editable  : React.PropTypes.bool.isRequired,
  update    : React.PropTypes.func.isRequired,
  save      : React.PropTypes.func.isRequired,
  className : React.PropTypes.string
};
