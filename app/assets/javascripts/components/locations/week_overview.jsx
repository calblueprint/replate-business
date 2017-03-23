/**
 * @prop schedule      - weekly schedule data
 * @prop reference     - MomentJS object indicating the calendar's reference point for the week displayed
 * @prop today         - MomentJS object for today's date
 * @prop isThisWeek    - Boolean indicating whether calendar is this week or next week
 * @prop fetchUpdates  - function that refreshes weekly schedule
 * @prop setForms      - function that sets data forms in parent state
 * @prop showEditModal - function that shows edit modal
 */
var DAYSOFWEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class WeekOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCancelModal : false, 
                   cancelData : {}
                 };
  }

  _cancelPickup = (e) => {
    let target = $(e.target);
    let date = target.attr('data-date');
    let id = target.attr('data-id');
    let frequency = target.attr('data-freq'); 
    let params = {
        "date"          : date,
        "recurrence_id" : id,
      };

    if (frequency === "one_time") {
      this.state.cancelData = {
        header      : "You're cancelling a one time pickup.",
        detail      : "Are you sure you want to continue?",
        buttonText  : ["Delete Pickup"],
        onClicks    : [this._deleteRecurrence],
        metadata    : params,
      }; 
    } else if (frequency === "weekly") {
      this.state.cancelData = {
        header      : "You're cancelling a pickup occurrence.",
        detail      : "Do you want to delete all occurrences of this pickup, or only the selected occurrence?",
        buttonText  : ["Delete Pickup", "Delete Selected"],
        onClicks    : [this._deleteRecurrence, this._createCancellation],
        metadata    : params,
      }; 
    }
    // Display cancel modal
    this.setState({ showCancelModal : true });
  }

  _createForms = (data) => {
    let basicForm = data.pickup;
    let recurrenceForm = {};
    let days = DAYSOFWEEK.map((day, i) => {
      recurrenceForm[day] = { active : false,
                              input : {},
                            };
    });
    let frequency;
    let displayTime;
    let start_date;
    let start_time;
    let recurrence_id;
    for (let i = 0; i < data.recurrences.length; i++) {
      let recurrence = data.recurrences[i];
      displayTime = moment(recurrence.start_date).format('L');
      start_date = recurrence.start_date;
      start_time = recurrence.start_time;
      recurrence_id = recurrence.id;
      recurrenceForm[recurrence.day].active = true;
      recurrenceForm[recurrence.day].input = recurrence;
      frequency = recurrence.frequency;
    }
    basicForm.frequency = frequency;
    basicForm.start_date_display = displayTime;
    basicForm.start_date = start_date;
    if (basicForm.frequency == "one_time") {
      basicForm.start_time = start_time;
      basicForm.recurrence_id = recurrence_id;
    }
    this.props.setForms(basicForm, recurrenceForm);
  }

  _editPickup = (e) => {
    let target = $(e.target);
    let id = target.attr('data-id');
    Requester.get(APIConstants.pickups.update(id),
                  this._createForms);
    this.props.showEditModal();
  }

  _deleteRecurrence = (params) => {
    Requester.delete(APIConstants.cancellations.destroy(params.recurrence_id),
                this.props.fetchUpdates);
  }

  _createCancellation = (params) => {
    Requester.post(APIConstants.cancellations.create(), params,
                  this.props.fetchUpdates);
  }

  _hideModal = () => {
    this.setState({ showCancelModal : false });
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

      let recurrenceDate = pickupListMoment.format();

      if (!isPastEvent) {
        cancelButton = <button data-id={recurrence.id} 
                               data-date={recurrenceDate} 
                               data-freq={recurrence.frequency} 
                               onClick={this._cancelPickup} 
                               className="cancelButton button-link">Cancel</button>
      }

      let editButton = <button data-id={pickup.id}
                               onClick={this._editPickup} 
                               className="editButton button-link">Edit</button>

      return (
        <div className={`pickup-item ` + (isPastEvent ? 'past' : '')} key={index}>
          <h4 className="name">{pickup.title}</h4>
          <p className="time">{timeString}</p>
          <p className="repeating">{recurrence.frequency === "weekly" ? "Repeating pickup" : "One-time pickup"}</p>
          {editButton}
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
    });
  }

  render() {
    let week = this._generateSchedule();
    let cancelModal;
    if (this.state.showCancelModal) {
      cancelModal = <ConfirmationModal
                      header = {this.state.cancelData.header}
                      detail = {this.state.cancelData.detail}
                      buttonText = {this.state.cancelData.buttonText}
                      onClicks = {this.state.cancelData.onClicks}
                      metadata = {this.state.cancelData.metadata}
                      showModal = {this.state.showCancelModal}
                      hideModal = {this._hideModal}
                    />
    }
    return (
      <div className="week-overview-container">
        {cancelModal}
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
  schedule     : React.PropTypes.object.isRequired,
  today        : React.PropTypes.object.isRequired,
  reference    : React.PropTypes.object.isRequired,
  isThisWeek   : React.PropTypes.bool.isRequired,
  fetchUpdates : React.PropTypes.func.isRequired,
};