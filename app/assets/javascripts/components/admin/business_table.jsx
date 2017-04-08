class BusinessTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResult: true,
      searchInput: "",
    };
    var testBiz = {
      id: 1,
      company_name: "Test",
      email: "test@email.com",
      phone: "123-456-7890"
    };
    this.state.businesses = [];
    this.state.filteredBiz = [];
    this.state.businesses.push(testBiz);
  }

  componentDidMount() {
    this.fetchBusinesses();
    this.copyToFiltered(this.state.businesses);
  }

  fetchBusinesses() {
    
  }

  copyToFiltered(businesses) {
    filteredBiz = [];
    for (var i = 0; i < businesses.length; i++) {
      filteredBiz.push(businesses[i]);
    }
    this.setState({ filteredBiz: filteredBiz});
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    this.state.searchInput = input;
    this.loadFilteredBusinesses();
  }

  loadFilteredBusinesses() {
    if (this.state.searchInput == "") {
      this.copyToFiltered(this.state.businesses);
      return;
    } 
    filtered = [];
    for (var i = 0; i < this.state.businesses.length; i++) {
      business = this.state.businesses[i];
      var reg = new RegExp(this.state.searchInput, "i");
      if (reg.test(business.company_name) || reg.test(business.email)) {
        filtered.push(business);
      }
    }
    this.copyToFiltered(filtered);
  }

  render() {
    let businesses;

    if (this.state.filteredBiz.length != 0) {
      businesses = this.state.filteredBiz.map((business, index) => {
        return <BusinessTableRow business={business} key={index} />
      });
    } else {
      businesses = <tr>
                 <td className="roster-loading" colSpan={6}>
                     No Results
                 </td>
               </tr>
    }

    return(
      <div className="content-wrapper roster-page container">
          <div className="roster-header">
            <h1 className="roster-title">Businesses</h1>
            <div className="roster-header-controls">
              <div className="searchbar">
                <input type="text" name="first_name" className="form-control"
                  onChange={(e) => this.onSearchChange(e)}
                  placeholder="Search for a person" />
              </div>
            </div>
          </div>
          <div className="roster-container">
            <table className="interactive roster-table">
              <thead id="table-head">
                <tr>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Stripe Connected?</th>
                </tr>
              </thead>
              <tbody>
                {businesses}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}