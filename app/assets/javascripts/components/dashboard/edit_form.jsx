class EditForm extends DefaultForm {
  constructor(props) {
    super(props);  
    this.state = props;
    this.handleChange = this.handleChange.bind(this);
  }

  

  handleButtonPress(event) {
    var profileattributes = document.getElementsByClassName("attribute");
    for (var a = 0; a < profileattributes.length;a++) {
      var attribute = profileattributes[a];
      if (attribute.hasAttribute("disabled")) {
        attribute.removeAttribute("disabled");
      }
      else {
        attribute.setAttribute("disabled","true");
      }
    }
  }

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  }

  render() {
    return (
      <form action="/businesses" method="post">
        Email:
        <input className="attribute" type="text" value={this.state["business[email]"]} name="business[email]" onChange={this.handleChange} disabled = {true} />
        Company Name:
        <input className="attribute" type="text" value={this.state["business[company_name]"]} name="business[company_name]" onChange={this.handleChange} disabled = {true} />
        Phone:
        <input className="attribute" type="text" value={this.state["business[phone]"]} name="business[phone]" onChange={this.handleChange} disabled = {true} />
        Address:
        <input className="attribute"  type="text" value={this.state["business[address]"]} name="business[address]" onChange={this.handleChange} disabled = {true} />
        <button type="button" onClick={this.handleButtonPress} value="edit"/> 

        <input type="password" name="business[current_password]" id="business_current_password" onChange={this.handleChange}/>
        <input type="hidden" name="_method" value="put"/>
        <input
                  type="hidden"
                  name="authenticity_token"
                  value={this._getToken()}
           />
        
        <input type="submit" name="commit" value="update"/>
      </form>
    );
  }
}