/**
* Allows admin to edit
* @prop admin - admin object
* @prop business - business object
*/

class AdminEdit extends DefaultForm {
  constructor(prop){
    super(prop);
    this.state = {
      editable:false,
    }
  }

  
}
