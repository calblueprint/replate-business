/** Component to render location donation history
 * @prop location - location object
 */
class DonationHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
          date: "12/2/2016",
          success: true,
          driver: "Eric L.",
        }, {
          date: "11/19/2016",
          success: true,
          driver: "Eric L.",
        }, {
          date: "11/17/2016",
          success: false,
          driver: "Vitian D.",
        }, {
          date: "11/12/2016",
          success: true,
          driver: "Lanju D.",
        }
      ]
    };
  }

  _retrieveHistory = () => {
    //TODO: implement actual retrieval of history here
  }

  render() {
    let emptyState;
    if (this.state.history.length == 0) {
      emptyState = (
        <div className="empty-table-container">
          <h1>No previous pickups yet!</h1>
        </div>
      );
    }

    const history = this.state.history.map((item, index) => {
      return (
        <HistoryRow item = {item}
                    key  = {index} />
      );
    });

    return (
      <div className="row">
        <div className="col-md-8">
          <h1 className="history-title marginBot-md">Donation History</h1>
          <div className="history-table-container">
            { emptyState }
            <table className="table history-table">
              <thead>
                <tr>
                  <th className="table-header">Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Driver</th>
                </tr>
              </thead>
              <tbody>
                { history }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <h1 className="history-title marginBot-md">More Info</h1>
          <div className="stats-container">
            You've donated { this.state.history.length } times!
          </div>
          <div className="history-button-container marginTop-md">
            <button className="button button--outline marginBot-xs">Submit Feedback</button>
            <button className="button button--text-black">Share your impact</button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * History Item component
 * @prop item - details of item
 */
class HistoryRow extends React.Component {
  render() {
    return (
      <tr className="table-row history-row">
        <td className="history-date-col">
          { this.props.item.date }
        </td>
        <td className={`history-status ` + this.props.item.success}>
          { this.props.item.success ? "Success" : "Cancelled" }
        </td>
        <td>
          { this.props.item.driver }
        </td>
      </tr>
    );
  }
}
