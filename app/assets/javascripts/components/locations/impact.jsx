/**
 * @prop location_id
 */

 class Impact extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
          tasks: [{
              scheduled_date: "12/5/2017",
              driver_id: 235,
              trays_donated: 4,
            }, {
              scheduled_date: "11/9/2017",
              driver_id: 532,
              trays_donated: 29,
            }, {
              scheduled_date: "11/17/2017",
              driver_id: 5235,
              trays_donated: 12,
            }, {
              scheduled_date: "11/12/2016",
              driver_id: 1234,
              trays_donated: 15,
            }
          ]
      };
    }

    // _fetchImpactUpdates = () => {
    //   const success = (data) => {
    //     this.setState({task: data})
    //   }
    //   Requester.get(APIConstants.tasks.update(
    //     this.props.location_id), success)
    // }


     render() {
       let empty;
       if (this.state.tasks.length == 0) {
         empty = (
           <div className="empty-table-container">
             <h1>No tasks</h1>
           </div>
         );
       }
       const tasks = this.state.tasks.map((item, index) => {
         return (
           <ImpactData item = {item}
                       key  = {index} />
         );
       });

       return (
         <div className="row">
           <div className="col-md-8">
             <h1 className="task-title marginBot-md">Task Information</h1>
             <div className="task-table-container">
               { empty }
               <table className="table task-table">
                 <thead>
                   <tr>
                     <th className="table-header">Scheduled Date</th>
                     <th className="table-header">Driver ID</th>
                     <th className="table-header">Trays Donated</th>
                   </tr>
                 </thead>
                 <tbody>
                   { tasks }
                 </tbody>
               </table>
             </div>
           </div>
           <div className="col-md-4">
             <h1 className="task-title marginBot-md">More Info</h1>
             <div className="stats-container">
               You have { this.state.tasks.length } tasks.
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
 class ImpactData extends React.Component {
   render() {
      return (
     <tr className="table-row impact-row">
       <td className="tasks-date-col">
         { this.props.item.scheduled_date }
       </td>
       <td className="driver-id-col">
         { this.props.item.driver_id }
       </td>
       <td>
         { this.props.item.trays_donated }
       </td>
     </tr>
   );
 }
}

Impact.propTypes = {
  location_id: React.PropTypes.number.isRequired,
}
