
class WeekOverview extends DefaultForm {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date().getDay(),
      schedule: {},
    };

    Requester.get(APIConstants.locations.week(this.props.location_id, this.props.today),
                  this._loadSchedule);
  }

  _generatePickupItems = (pickupList, pickupListDay) => {
    return pickupList.map((data, index) => {
      let pickup = data[0];
      let recurrence = data[1];
      const timeString = `${recurrence.start_time}-${recurrence.end_time}`;
      const isPastEvent = pickupListDay < this.state.today;
      let cancelButton;

      if (!isPastEvent) {
        cancelButton = <a href="" className="cancelButton">Cancel</a>
      }

      return (
        <div className={`pickup-item ` + (isPastEvent ? 'past' : '')} key={index}>
          <h4 className="name">{pickup.title}</h4>
          <p className="time">{timeString}</p>
          <p className="repeating">{recurrence.frequency ? "Repeating pickup" : "One-time pickup"}</p>
          {cancelButton}
        </div>
      )
    })
  }

  _loadSchedule = (schedule)=> {
    this.setState({
      today: new Date().getDay(),
      schedule: schedule
    });
  }

  _generateSchedule = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    return days.map((day, index) => {
      const dayNum = index + 1;
      const isCurrentDay = (dayNum == this.state.today);
      const columnClass = `day-column ` + (isCurrentDay ? 'currentDay' : '');
      let columnContents;

      if (this.state.schedule[day]) {
        columnContents = this._generatePickupItems(this.state.schedule[day], dayNum);
      } else {
        columnContents = (
          <div className="pickup-item">
            <p className="name no-pickup-label">No pickups today</p>
          </div>
        )
      }

      return (
        <div className={columnClass} key={index}>
          <div className="day-header">
            <h3>{day}</h3>
            <button className="new-pickup-button">new pickup</button>
          </div>
          {columnContents}
        </div>
      )
    })
  }

  render() {
    let week = this._generateSchedule();

    return (
      <div className="week-overview-container">
        <div className="week-overview-title">
          <h2 className="title">This Week's Schedule</h2>
          <h3 className="day-range">Nov 11-18</h3>
        </div>

        <div className="week-container">
          {week}
        </div>
      </div>
    );
  }
}

