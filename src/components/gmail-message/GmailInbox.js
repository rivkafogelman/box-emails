// import React, { useState, useEffect, useRef } from 'react'
// import { connect } from 'react-redux'
// import {
//   FaTrashAlt,
//   FaPaperclip,
//   FaMinus,
//   FaExpandAlt,
//   FaTimes,
//   FaCalendar
// } from 'react-icons/fa'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { getGmailAddressServer } from '../../redux/actions/googleAuth.actions'
// import {
//   newConversation,
//   setIsMessageOpen,
//   removeNewMessageCard,
//   setEmailFromMassage
// } from '../../redux/actions/conversation.actions'
// import { getMesagesGmailServer } from '../../redux/actions/googleAuth.actions'
// import { deleteGroup, setShow } from '../../redux/actions/group.actions'
// import NewGroup from '../new-group/NewGroup'
// import {
//   getSignatureServer,
//   setSignatureName
// } from '../../redux/actions/signature.actions'
// import {
//   addDraft,
//   editDraft,
//   deleteDraft
// } from '../../redux/actions/draft.actions'
// import $ from 'jquery'
// import Tooltip from '@material-ui/core/Tooltip'
// import conversationService from '../../services/conversation.service'
// // import profileImg from '../../assets/Component 157–6.svg'
// import SignaturePreview from '../signature/SignaturePreview'
// import ReactDOMServer from 'react-dom/server'
// import uploadAnimation from '../../assets/animation_500_kkl8emcp.gif'
// import { Dropdown } from 'semantic-ui-react'
// import { Provider } from 'react-redux'
// import store from '../../redux/store'
// import '../conversation/Conversation.scss'
// import '../../App.css'

// function GmailInbox (props) {
//   let gmail = []
//   useEffect(() => {
//     props.getMesagesGmailServer('inbox')
//   }, [])
//   useEffect(() => {
//     gmail = props.gmailMassageArrSent
//     console.log('gmailMassageArrSent', gmail)
//     // setGmailsAll(props.gmailMassageArrSent)
//   }, [props.gmailMassageArrSent])

//   return (
//     <>
//       <div className='innerDivv'>
//         {props.gmailMassageArrSent &&
//           props.gmailMassageArrSent.map((w, ind) => (
//             <>
//               <div className='conversationDiv'>
//                 <div className='centeralDiv'>
//                   <div className='fromAndNum'>
//                     <div className='fromNames'>
//                       <span className='contactHref'>
//                         <div key={ind}>{w.to}</div>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='dateAndMore'>
//                   <div className='dateLine'>
//                     <span className='conversationDate'>
//                       {w.date}
//                       {/* {wave.timestamp && conversationService.getTime(wave.timestamp)} */}
//                     </span>

//                     {/* {  DateTime date = Convert.ToDateTime(w.date)&& w.date = date.ToString("dd/MM/yyyy")} */}
//                   </div>
//                 </div>
//                 <div className='subject'>
//                   <span>{w.subject != null ? w.subject : '(no subject)'}</span>
//                 </div>
//                 <div className='waveBody'>{w.massage && w.massage}</div>
//               </div>
//             </>
//           ))}
//       </div>
//     </>
//   )
// }
// export default connect(
//   state => {
//     return {
//       googleAuth: state.init.googleAuth,
//       gmailUserAddress: state.googleAuth.gmailUserAddress,
//       // gmailMassageArrSent: state.googleAuth.gmailMassageArrSent
//     }
//   },
//   {
//     getGmailAddressServer: getGmailAddressServer,
//     setEmailFromMassage,
//     getMesagesGmailServer
//   }
// )(GmailInbox)
