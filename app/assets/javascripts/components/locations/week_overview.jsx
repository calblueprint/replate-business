/**
 * @prop schedule    - weekly schedule data
 * @prop reference   - MomentJS object indicating the calendar's reference point for the week displayed
 * @prop today       - MomentJS object for today's date
 * @prop isThisWeek  - Boolean indicating whether calendar is this week or next week
 */
class WeekOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  _getPickupListMoment = (pickupListDay) => {
    let pickupListMoment = moment(this.props.reference);
    pickupListMoment.startOf('week').add(1 + pickupListDay, 'days');
    return pickupListMoment
  }

  _generatePickupItems = (pickupList, pickupListDay) => {
    return pickupList.map((data, index) => {
      let pickup = data[0];
      let recurrence = data[1];
      const timeString = `${recurrence.start_time}-${recurrence.end_time}`;
      let pickupListMoment = this._getPickupListMoment(pickupListDay);
      const isPastEvent = pickupListMoment.isBefore(this.props.today, "day");
      let cancelButton;

      if (!isPastEvent) {
        cancelButton = <a data-recurrence={recurrence.id} data-day={pickupListDay} href="" onClick={this._cancelPickup} className="cancelButton">Cancel</a>
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
    let reference = moment(this.props.reference);
    let monday = reference.startOf('week').add(1, 'day').format('MMM D');
    let friday = reference.endOf('week').subtract(1, 'day').format('MMM D');
    return monday + ' - ' + friday;
  }

  _generateSchedule = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    return days.map((day, index) => {
      const dayNum = index;
      let pickupListMoment = this._getPickupListMoment(dayNum);
      const isCurrentDay = (pickupListMoment.isSame(this.props.today, 'day'));
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
  schedule   : React.PropTypes.object.isRequired,
  today      : React.PropTypes.object.isRequired,
  reference  : React.PropTypes.object.isRequired,
  isThisWeek : React.PropTypes.bool.isRequired,
};