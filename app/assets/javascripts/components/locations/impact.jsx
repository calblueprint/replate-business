/**
 * @prop location_id
 */

 class Impact extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       tasks: [],
      //  showModal: false;
      };
   }

   componentWillReceiveProps(nextProps) {
     this.state.tasks = nextProps.tasks;
   }


   close = (e) => {
     var initial = this.state.initialState;
     this.state = initial;
     this.setState({initialState: initial});
     this.setState({ showModal: false });
     document.getElementById('map').innerHTML = '';

   }

   openModal = () => {
     this.setState({ showModal: true });
   }

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
                     <th className ="table-header">Photo</th>
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
     let scheduled_date = moment(this.props.item.scheduled_date).format('MMMM Do YYYY, h:mm a');
      return (
         <tr className="table-row impact-row">
           <td className="tasks-date-col">
             { scheduled_date }
           </td>
           <td className="driver-id-col">
             { this.props.item.driver }
           </td>
           <td>
             { this.props.item.trays_donated }
           </td>

           <td>
             
           </td>
       </tr>
   );
 }
}

Impact.propTypes = {
  location_id: React.PropTypes.number.isRequired,
}
