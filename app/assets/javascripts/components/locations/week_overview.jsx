/**
 * @prop schedule - weekly schedule data
 * @prop today    - "today" date string
 * @prop now      - MomentJS object indicating today's date
 * @prop isThisWeek  - Boolean indicating whether calendar is this week or next week
 */
class WeekOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  _generatePickupItems = (pickupList, pickupListDay) => {
    return pickupList.map((data, index) => {
      let pickup = data[0];
      let recurrence = data[1];
      const timeString = `${recurrence.start_time}-${recurrence.end_time}`;
      let pickupListMoment = moment(this.props.now);
      let now = moment(this.props.now);
      if (!this.props.isThisWeek) {
        now.subtract(1, "weeks");
      }
      pickupListMoment.startOf('week')
      pickupListMoment.add(pickupListDay, 'days');
      const isPastEvent = pickupListMoment.isBefore(now);
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

  _getWeekHeader = () => {
    let now = moment(this.props.now);
    let monday = now.startOf('week').add(1, 'day').format('MMM D');
    let friday = now.endOf('week').subtract(1, 'day').format('MMM D');
    return monday + ' - ' + friday;
  }

  _generateSchedule = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    return days.map((day, index) => {
      const dayNum = index + 1;
      const isCurrentDay = (dayNum == new Date().getDay());
      const columnClass = `day-column ` + (isCurrentDay ? 'currentDay' : '');
      let columnContents;

      if (this.props.schedule[day]) {
        columnContents = this._generatePickupItems(this.props.schedule[day], dayNum);
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
          <h2 className="title">{this.props.isThisWeek ? "This" : "Next"} Week's Schedule</h2>
          <h3 className="day-range">{this._getWeekHeader()}</h3>
        </div>

        <div className="week-container">
          {week}
        </div>
      </div>
    );
  }
}

WeekOverview.propTypes = {
  today    : React.PropTypes.string.isRequired,
};