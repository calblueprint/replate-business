// Here we extend from the DefaultForm class located in templates.
// This gives us access to key functions we've inhereted from our parent class,
// including how we will make post requests! Be sure to check out that class
// for more information.

// TODO: in the commented lines below declare the props passed into the contructor
// that you declared in the views/businesses/home.html.erb i.e:
// @prop student_id - id associated with student
// @prop school_id - id associated with student

// remember when you create a location it needs to have a business_id that will
// allow us to find the business it belongs to!

/**
* FILL IN YOUR PROPS HERE
**/
class LocationCreationModule extends DefaultForm {

  constructor(props) {
    // I'm pretty sure this is where we get the props passed in from business_dashboard
    super(props);
    /**
    * ADD THE VALUE PAIR FOR business_id TO THE STATE.
    * THE FORMAT IS business_id : prop. I did this one for you for now
    * the state will now contain a dictionary of key value pairs corresponding to
    * attributes on the input form.
    **/
    this.state = { business_id : this.props.business_id }
  }


  // This function will handle posting the form information to the right url
  _attemptCreate = (e) => {
      // 'success' is a variable name bound to a function that takes in parameter 'msg'
        const success = (msg) => {
            /**
            * INSERT SUCCCESS MESSAGE HERE ie alert("Yay you made a location!")
            * in the future this may have to change.
            **/
        }
        /**
        * PASS IN CORRECT PARAMS TO _attemptAction() (see default form!)
        **/
        this._attemptAction();
    }

  // Here is the code that will determine what shows up on the html page!
  // I've copy pasted a form template that you can customize the input fields with.
  // You should replace the items betwen the <label> tages, as well as the name="" attribute.
  // I think whatever is in the name="" attribute will become a dictionary key, with the
  // value set to whatever the user inputs.

  // this._handleChange will update the state, or the dictionary of params the use has input so far!
  //  look at default form to see more about this function.
  render() {
    return (
    <fieldset className="input-container name-container">
        <label>First name</label>
        <input type="text" placeholder="First Name" ref="focus" name="first_name" onChange={this._handleChange} />
    </fieldset>

    <fieldset className="input-container name-container">
        <label>Last name</label>
        <input type="text" placeholder="Last Name" name="last_name" onChange={this._handleChange} />
    </fieldset>
    <button type="submit" name="submit" value="Create Student" className="submit-button" onClick={this._attemptCreate}>Create</button>

    );
  }

}
