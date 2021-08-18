// import React, { useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// // import Dialog from '@material-ui/core/Dialog';
// // import DialogActions from '@material-ui/core/DialogActions';
// // import DialogContent from '@material-ui/core/DialogContent';
// // import DialogContentText from '@material-ui/core/DialogContentText';
// // import DialogTitle from '@material-ui/core/DialogTitle';
// import { connect } from 'react-redux';
// import { actions } from '../../redux/actions/allActions';
// import { Modal } from 'react-bootstrap';

// import { red } from '@material-ui/core/colors';

// function mapStateToProps(state) {

//     return {
//         alertStatuse: state.alert,
//         // contactDetails: state.contactDetails.contactDetails,
//         // managerComponent: state.managerComponent.currentComponent,
//         //   alertStatuse: state.alert.alertStatuse,
//     };
// }
// function mapDispatchToProps(dispatch) {

//     return {
//         // deleteContact: (a) => dispatch({ type: 'DELETE_CONTACT' }),
//         setAlertstatuse: (a) => dispatch(actions.setAlertstatuse(a)),
//         // setActive: (a) => dispatch(actions.setActive(false)),
//         // deleteDeal: () => dispatch({ type: 'DELETE_DEAL' })
//         //    setAlertstatuse: (status) => dispatch(actions. setAlertstatuse(status)),
//         //   deleteCard: (insdex) => dispatch(actions.deleteCard(insdex)),
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(function AlertDelete(props) {
//     // const [open, setOpen] = React.useState(false);
//     const { alertStatuse, setAlertstatuse } = props;


//     // useEffect(() => {

//     //     console.log(props, deleteContact, alertStatuse);
//     // });

//     return (

//         <div>




//             < Modal className="model" show={alertStatuse.alertStatuse !== 0} >

//                 <div>
//                     <Modal.Body className="messageDeleteContacts">

//                         <div className="row d-flex justify-content-center" type="text" >
//                             <span className="text_inMessage">{alertStatuse.alertMessage}</span>
//                             <br></br>
//                             <br></br>
//                             <br></br>

//                             <div className="row d-flex justify-content-center">
//                                 <div className="">
//                                     <Button onClick={(e) => { e.preventDefault(); setAlertstatuse(0) }} className="whiteBtn  modelBtn btnCapitalize" autoFocus>
//                                         Cancel
//                                     </Button></div>
//                                 <div className="">

//                                     {alertStatuse.alertStatuse ? (() => {
//                                         switch (alertStatuse.alertStatuse) {
//                                             case 1: return <Button onClick={(e) => {
//                                                 e.preventDefault(); setAlertstatuse(0); setActive();
//                                                 deleteContact()
//                                             }} className="blueBtn   modelBtn btnCapitalize" autoFocus>
//                                                 Ok</Button>;
//                                             case 2: return <Button onClick={(e) => {
//                                                 e.preventDefault(); setAlertstatuse(0);
//                                                 setActive(); deleteDeal()
//                                             }} className="blueBtn   modelBtn btnCapitalize" autoFocus>
//                                                 Ok</Button>;
//                                         }
//                                     })() : ''}

//                                 </div>
//                             </div>
//                         </div>

//                     </Modal.Body>
//                 </div>
//             </Modal>






//         </div>
//     );
// });