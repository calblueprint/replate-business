/**
 + * @prop pickups   - list of saved data associated with the pickup form
 + * @prop pickup_id - id associated with the current pickup
 + * @prop success
 + */

 class PickupTable extends React.Component {

   constructor(props) {
     super(props);
   }

  render() {
     let emptyState, pickups;

     if (!this.props.pickups) {
       emptyState = (
         <div className = "empty-table-container">
           <h1> No pickups. </h1>
         </div>
       );
     } else {
       pickups = this.props.pickups.map((p) => {
         return (
           <Pickup pickup = { p }
                   key    = { p.id } />
         );
       });
     }

     return (
       <div className="request-table-container">
         {emptyState}
         <table className="table request-table">
           <thead>
             <tr>
               <th className="request_name-col">NAME</th>
               <th className="start_time-col">START TIME</th>
               <th className= "end_time-col"> END TIME</th>
               <th className="date-col">DATE</th>
               <th className="comments-col">COMMENTS</th>
             </tr>
           </thead>
           <tbody>
             {pickups}
           </tbody>
         </table>
       </div>
      );
    }
  }

 PickupTable.propTypes = {
   pickups   : React.PropTypes.array.isRequired,
   pickup_id : React.PropTypes.number,
  success   : React.PropTypes.func
 };

 /**
  * @prop pickup_id - id associated with the current pickup
  * @prop pickup  - pickup details
  */

  class Pickup extends React.Component {

     constructor(props) {
       super(props);
     }

     render() {
       return (
         <tr className="pickup-row">
           <td> { this.props.pickup.title } </td>
           <td> { this.props.pickup.start_time } </td>
           <td> { this.props.pickup.end_time} </td>
           <td> { this.props.pickup.day} </td>
           <td> { this.props.pickup.comments } </td>
         </tr>
       );
     }
   }


 Pickup.propTypes = {
   pickup: React.PropTypes.object.isRequired,
   pickup_id : React.PropTypes.number,

 }
