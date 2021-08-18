// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { actions } from '../../redux/actions/allActions'
// import { useDispatch, useSelector } from 'react-redux';
// import {Button ,Form ,Card} from 'react-bootstrap';
// import './notifications.css'
// import {FaRegBell} from 'react-icons/fa'
// import { CgEnter } from 'react-icons/cg';

// export const SuccessAddedNotification=(props)=>{

//   const close=()=>{
//     window.open("blank", "_self")
//     window.close();
//   }
  
//     return (
//     <div className='flex-containerr'style={{backgroundColor:'#7B7D86'}}>
//     <Card 
//       className='col-4  text-center pb-4'
//       style={{borderTop:'6px solid #3598F4'}}
//     >
//   <Card.Body>
//     <Card.Title>
//       <div className="d-flex justify-content-strat">
//       <Button variant="light" size="sm" onClick={(e)=>close()}>X</Button>
//       </div>

//         <FaRegBell  style={{color:'#3598F4',
//                             borderRadius:'50%',
//                             padding:'2%',
//                             fontSize: '5rem'}}
//         />

//     </Card.Title>
//     <Card.Text className='h5 text-center my-4' style={{color:'#7B7D86'}}>
//     <div className='my-2'
//     style={{fontWeight:'bold'}}
//     >
//     You added to list!
//       </div>
//       Now you stay updated
//     </Card.Text> 
//     <Button size="md" variant="primary"className='px-5' onClick={()=>{close()}}>Ok</Button>
//   </Card.Body>
// </Card>

//    </div>)
// }