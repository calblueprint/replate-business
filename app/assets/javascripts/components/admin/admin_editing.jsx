// /**
// * Allows admin to edit
// * @prop admin - admin object
// * @prop business - business object
// */
//
// class AdminEdit extends DefaultForm {
//   constructor(prop){
//     super(prop);
//     this.state = {
//       editable:false,
//       loading: true,
//     }
//   }
//
//   _handleBusinessDelete = () => {
//     const success = ()  => {
//       window.businesses = "/dashboard";
//     }
//     this.setState({loading:true, })
//     Requester.delete(APIConstants.businesses.update(this.prop.business.id), success)
//
//   }
//
//   render(
//     let loading;
//
//     if (this.state.loading) {
//       loading =
//         <div className = "loading-container"
//           <div className = "loading" ></div>
//         </div>
//
//       return (
//         <div>
//           <button className = "button button--text-alert" onClick = {this.openModal}>
//             Delete Location
//           </button>
//           <Modal
//             className = "delete-business-modal"
//             show = {this.state.showModal}
//             onHide = {this.closeModal}
//             >
//               {loading}
//               <Modal.Header>
//                 <Modal.Title>Delete Business</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <p> Are you sure you want to delete this business?</p>
//               </Modal.Body>
//               <Modal.Footer>
//                 <button
//                   className= "button button--text-black"
//                   onClick = {this.closeModal}
//                   >No, don't delete</button>
//                   <button
//                     className = "button button --alert marginLeft-sm"
//                     onClick   = {this._handleBusinessDelete}
//                     > Yes Delete!</button>
//               </Modal.Footer>
//             </Modal>
//             </div>
//       );
//     }
//   )
//
//
//
//   _attemptSave = (e) => {
//     const success = (msg) => {
//       this.setState({editable:false});
//     };
//
//     const fail = (msg) => {
//       this.setState({editable:true});
//     };
//     Requester.update(APIConstants.locations.update(this.props.location.id),
//       this._formFields(), success, fail)
//   }
//
//
//   render() {
//     return(
//       <div className = "edit_admin_container">
//         <form>
//           {this._showInput("Business Name", "business_name", this.prop.businesses)}
//           <FormEditToggle
//             editable = {this.state.editable }
//             update   = {this.state.update }
//             save     = {this._attemptSave} />
//
//         </form>
//         <div>
//     )
//
//
//   AdminEdit.propTypes = {
//     admin: React.propTypes.object.isRequired,
//     business: React.propTypes.object.isRequired,
//   }
