/**
 * @prop label        - label of field to show
 * @prop name         - name of input component
 * @prop data         - current input for label
 * @prop editable     - true if fields are editable
 * @prop handleChange - callback function when form inputs change
 */
class EditableInput extends React.Component {

    render() {
        let inputVal;
        if (this.props.editable) {
            inputVal = (
                <input name={this.props.name} type="text"
                    defaultValue={this.props.data}
                    onChange={this.props.handleChange} />
            );
        } else {
            inputVal = this.props.data;
        }

        let labelVal;
        if (this.props.label) {
            labelVal = (
                <label htmlFor={this.props.label}>
                    { this.props.label }:
                </label>
            );
        }

        return (
            <fieldset className="input-container">
                <div className="label-container">
                    { labelVal }
                </div>
                <div className="input-box-container">
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
