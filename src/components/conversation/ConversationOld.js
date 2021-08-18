// import React, { useEffect, useState, useRef } from 'react'
// import { FaFilter, FaLightbulb, FaCalendarAlt, FaDatabase, FaStar, FaFlag, FaFileAlt, FaHandshake, FaNetworkWired, FaPaperclip } from 'react-icons/fa'
// import './Conversation.scss'
// import { connect } from 'react-redux';
// import { editConversation, addConversationIdToEdit, removeConversationIdToEdit, getConversations } from '../../redux/actions/conversation.actions'
// import GmailInbox from '../gmail-message/GmailInbox'
// import initService from '../../services/init.service'
// import profileImg from '../../assets/Component 157 – 6.svg'
// import imgFile from '../../assets/imageFile.svg'
// import pdfFile from '../../assets/pdfFile.svg'
// import wordFile from '../../assets/wordFile.svg'
// import checkImg from '../../assets/check.svg'
// import flagImg from '../../assets/flag.svg'
// import redFlag from '../../assets/redFlag.svg'
// import uncheckedStarImg from '../../assets/fillGreyStar.svg'
// import checkedStarImg from '../../assets/fillYellowStar.svg'
// import conversationService from '../../services/conversation.service'
// import Tooltip from '@material-ui/core/Tooltip';
// import { OverlayTrigger, Popover, Button } from 'react-bootstrap'
// import { FaDownload } from 'react-icons/fa'
// import { faFlag } from '@fortawesome/free-solid-svg-icons';

// // Alltext 
// import allText from '../../allText.json'
// import { Checkbox } from '@material-ui/core';
// import { BiTrashAlt } from "react-icons/bi";

// src / components / conversation / ConversationOld.js
// function Conversation(props) {
//     let userName = props.user.username
//     const { changeDisplayConver } = props
//     const [allTags, setAllTags] = useState([]);
//     const [conversation, setConversation] = useState({});
//     const [wave, setWave] = useState({});
//     const [tag, setTag] = useState(null);
//     const displayArchived = props.selectedListFlag && props.flagsList && (props.selectedListFlag.toLowerCase() === props.flagsList.archived.toLowerCase())
//     const flagRef = useRef(null)
//     const [showFollowUpOption, setShowFollowUpOption] = useState(false)
//     const [followUpDate, setFollowUpDate] = useState((new Date()).toISOString().split('T')[0])
//     const [followUpTime, setFollowUpTime] = useState("09:00")
//     const [followUpDateWithTime, setFollowUpDateWithTime] = useState(followUpDate.toString() + "T" + followUpTime.toString() + ":00.602Z")
//     const [bgc, setBgc] = useState('readedConversation')
//     const [converDivDisplay, setConverDivDisplay] = useState('conversationDiv')
//     // const [flag, setFlag] = useState(flagImg);
//     // const [nameLetters, setNameLetters] = useState("nameLetters")

//     useEffect(() => {
//         setAllTags(props.tags);
//         if (props.conversation) {
//             setConversation(props.conversation);
//             setTag(props.tags.find(t => t._id === props.conversation.tag));
//             // if (conversation.flagged && conversation.flagged.bool)
//             //     setFlag(redFlag)

//             // setFlag(conversation.flagged.bool ? redFlag : flagImg)
//         }
//         if (props.conversation.waves) {
//             if (props.conversation.waves.length) {
//                 setWave(props.conversation.waves[props.conversation.waves.length - 1]);
//             }
//         }
//         if (followUpTime || followUpDate) {
//             setFollowUpDateWithTime(followUpDate.toString() + "T" + followUpTime.toString() + ":00.602Z")
//         }
//     }, [props.tags, props.conversation, followUpDate, followUpTime])

//     // useEffect(() => {
//     //     props.addConversationIdToEdit(props.selectedConversation._id)
//     //     //to get the prev and slice it!!!!!!    
//     // }, [props.selectedConversation])

//     const getWaveBodyText = (waveBody) => {
//         let text = waveBody.split('<');
//         let textString = ""
//         for (let i = 0; i < text.length - 1; i++) {
//             text[i] = text[i].substring(text[i].indexOf('>') + 1)
//             if (i > 0) {
//                 textString += " " + text[i]
//             }
//         }
//         return textString
//     }
//     useEffect(() => {
//         if (props.changeDisplayConver) {
//             setBgc('readedConversation')
//             setConverDivDisplay('conversationDiv')
//         }
//         else {
//             setBgc('changeColor')
//             setConverDivDisplay('smallDivConver')
//         }


//     }, [props.changeDisplayConver])
//     const displayFrom = () => {
//         let len = conversation.waves.length
//         return (
//             conversation.waves.map(w => <>
//                 {/* changes for contactId */}
//                 {w.from && w.from.length === 24 &&
//                     <span className='contactHref' onClick={() => { refToContactByContactId(w.from) }}>{
//                         props.contacts.find(c => c._id === w.from).name ||
//                         // if the contact doesn't has 'name'-
//                         props.contacts.find(c => c._id === w.from).email}
//                     </span> ||
//                     w.from &&
//                     <span className="contactHref" className={`contactHref `} >{
//                         w.from.indexOf('@mail.leader.codes') !== -1 ? w.from.slice(0, w.from.indexOf('@')) : w.from
//                     }</span>
//                 }
//                 {/* for system message */}
//                 {!w.from && conversation.source && <span>{conversation.source}</span>}
//                 {/* display , between */}
//                 {(w.from || conversation.source) && --len != 0 && <span className="contactLinkComma">, </span>}
//             </>
//             ))
//     }

//     const refToContactByContactId = (contactId) => {
//         let contact = props.contacts.find(c => c.Id === contactId)
//         window.open(
//             `https://contacts.dev.leader.codes/${userName}?c=${contact.email}`,
//             '_blank'
//         )
//     }

//     const refToContact = (myEmail) => {
//         //wave.from contain username and in the old versions - username@mail.leader.codes
//         if (myEmail.indexOf('@') === -1 || myEmail.indexOf('@mail.leader.codes') !== -1) {
//             let uName = myEmail.slice(0, myEmail.indexOf('@'))
//             initService.getUser(uName).then((user) => {
//                 window.open(
//                     `https://contacts.dev.leader.codes/${userName}?c=${user.email}`,
//                     '_blank'
//                 );
//             }).catch((err) => {
//                 alert(err)
//             })
//         }

//         //if it's gmail email
//         else {
//             window.open(
//                 `https://contacts.dev.leader.codes/${userName}?c=${myEmail}`,
//                 '_blank'
//             );
//         }
//     }

//     const downloadFile = (event, url) => {
//         let type = url.substring(url.indexOf('__') + 2)
//         type = type.substring(type.indexOf('.') + 1)

//         event.stopPropagation()
//         conversationService.downloadFile(url, type).then(() => {
//         }).catch((err) => {
//             console.log(err)
//         })
//     }
//     const addToSelected = (e) => {
//         e.stopPropagation()
//         if (props.conversation.source !== 'google') {
//             props.addConversationIdToEdit(conversation._id)
//         }
//     }

//     const removeToSelect = (e) => {
//         e.stopPropagation()
//         props.removeConversationIdToEdit(conversation._id)
//     }


//     const getSrc = (f) => {

//         let x = f.substring(f.indexOf('__') + 2)
//         x = x.substring(x.indexOf('.') + 1)
//         switch (x.toLowerCase()) {
//             case "png":
//                 return imgFile
//             case "pdf":
//                 return pdfFile
//             case "word":
//                 return wordFile
//             default:
//                 break;
//         }
//     }

//     const popover = (
//         <Popover id="popover-basic" className="flagPopover">
//             <Popover.Content>
//                 <div>
//                     <svg onClick={() => setShowFollowUpOption(false)} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
//                         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
//                     </svg>
//                 </div>
//                 <h6 className="flagTitel">Follow Up Time</h6>
//                 <input className="inputFlag" type="time" value={followUpTime} onChange={(e => { setFollowUpTime(e.target.value); setFollowUpDateWithTime(followUpDate.toString() + "T" + e.target.value.toString() + ":00.602Z") })} ></input>
//                 <br></br>
//                 <input className="inputFlag" type="date" value={followUpDate} onChange={(e => { setFollowUpDate(e.target.value); setFollowUpDateWithTime(e.target.value.toString() + "T" + followUpTime.toString() + ":00.602Z") })}></input>
//                 <br></br>
//                 <div className=" d-flex justify-content-center">
//                     <Button className="saveFlag" onClick={(e) => {

//                         // setFlag(redFlag)
//                         // !conversation.flagged.bool
//                         setShowFollowUpOption(false); props.editConversation({ _id: conversation._id, flagged: { bool: true, date: followUpDateWithTime } }); props.getConversations(); e.stopPropagation()
//                     }}>Save</Button>
//                 </div>
//             </Popover.Content>
//         </Popover>

//     );
//     return (
//         <div >
//             {!props.selectedListFlag===props.flagsList.systemWaves && conversation.waves && (!conversation.archived || conversation.archived === displayArchived) &&
//                 //   conversationDiv

//                 <div
//                     className={`${converDivDisplay} ${!changeDisplayConver && 'row '}   ${conversation.readed && `readedConversation`}
//                  ${props.selectedConversation && props.selectedConversation != "empty"
//                         && conversation._id && props.selectedConversation._id && conversation._id === props.selectedConversation._id
//                         && `selectedConversation`} `}
//                 >
//                     <div className={`leftDiv ${!changeDisplayConver && 'col-1'}`}>
//                         {props.conversationsIdsToEdit.find(id => id === props.conversation._id) &&
//                             // props.contacts.find(c => c.email === wave.from).thumbnail && <img src={props.contacts.find(c => c.email === wave.from).thumbnail} className="contactImg"></img> ||
//                             <div className={`avatar ${props.changeDisplayConver ? 'nameLettersBig ' : 'nameLettersSmall '}  showChecked`} onClick={removeToSelect}><img src={checkImg} alt="V"></img></div>
//                             ||
//                             <div className={`avatar ${props.changeDisplayConver ? 'nameLettersBig' : 'nameLettersSmall '}`} onClick={addToSelected} style={{ backgroundColor: wave.colorFrom || "#8580FD" }}>{wave.nameFrom && conversationService.getContactLetters(wave.nameFrom) || conversationService.getContactLetters(wave.from)}</div>
//                         }
//                     </div>
//                     <div className={`${changeDisplayConver && 'centeralDiv'} ${!changeDisplayConver && 'col-10 row'}`} >
//                         <div className={`fromAndNum ${!changeDisplayConver && 'col-4 converBlock'}`} >
//                             <div className="fromNames">
//                                 <span>
//                                     {displayFrom()}
//                                 </span>
//                                 {conversation.waves.length > 1 && <span className="numWaves ">{conversation.waves.length}</span>}
//                             </div>
//                         </div>
//                         <div className={`subject ${conversation.readed === false && "bold"} ${!changeDisplayConver && 'col-3 converBlock ddd'} `}>
//                             {conversation.fwd && <span>Fwd: </span>}
//                             <span className={` `}>
//                                 {conversation.subject != null ? conversation.subject : "(no subject)"}
//                             </span>
//                         </div>

//                         <div className={`waveBody ${!changeDisplayConver && 'col-5 converBlock'}`} >
//                             {tag && <div className="tagInConv" style={{ backgroundColor: tag.color }} >{tag.title}</div>}
//                             {wave.body && getWaveBodyText(wave.body)}
//                         </div>

//                     </div>
//                     <div className={`dateAndMore ${!changeDisplayConver && 'col-1'}`}  >
//                         <div className="dateLine">
//                             <span className="conversationDate">
//                                 {wave.timestamp && conversationService.getTime(wave.timestamp)}
//                             </span>
//                             <Tooltip title={allText.star}>
//                                 <img src={conversation.starred == true && checkedStarImg || uncheckedStarImg}
//                                     onClick={async (e) => {
//                                         e.stopPropagation()
//                                         await props.editConversation({ _id: conversation._id, starred: !conversation.starred }, "starred")
//                                     }}
//                                 ></img>
//                             </Tooltip>

//                             <span>
//                                 <OverlayTrigger show={showFollowUpOption} placement="right" overlay={popover}>
//                                     <Tooltip title={allText.follow}>
//                                         {/* {conversation.flagged.bool ? flag = redFlag : flag = flagImg} */}
//                                         <img src={conversation.flagged && conversation.flagged.bool ? redFlag : flagImg}
//                                             ref={flagRef} className={`conversationFlag ${conversation.flagged && conversation.flagged.bool == true ? `checkedFlag` : `unCheckedFlag`}`}
//                                             onClick={async (e) => {
//                                                 e.stopPropagation()
//                                                 // !conversation.flagged.bool
//                                                 setShowFollowUpOption(!showFollowUpOption)
//                                                 if (conversation.flagged && conversation.flagged.bool) {
//                                                     await props.editConversation({ _id: conversation._id, flagged: { bool: !conversation.flagged.bool, date: followUpDateWithTime } })
//                                                     props.getConversations()
//                                                 }
//                                             }}
//                                         >
//                                         </img>

//                                     </Tooltip>
//                                 </OverlayTrigger>
//                             </span>
//                         </div>
//                         {changeDisplayConver && conversation.source && props.sourcesArray.find(s => s.name.toLowerCase() == conversation.source.toLowerCase())
//                             && <div className="iconInConv"> {props.sourcesArray.find(s => s.name.toLowerCase() == conversation.source.toLowerCase()).icon}</div>}
//                         {changeDisplayConver && wave.files.map(f =>
//                             <div>{f.url && <><img src={getSrc(f.url)} className="fileInConv"></img>
//                             </>}</div>
//                         )}
//                     </div>
//                 </div>
//             }</div>

//     )
// }

// export default connect(
//     (state) => {
//         return {
//             tags: state.tags.tags,
//             allUserContacts: state.init.contacts,
//             selectedConversation: state.conversations.selectedConversation,
//             conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
//             user: state.init.user,
//             selectedListFlag: state.conversations.selectedListFlag,
//             flagsList: state.conversations.flagsList,
//             displaySystemWaves: state.conversations.displaySystemWaves,
//             contacts: state.init.contacts,
//             sourcesArray: state.init.sources,
//             changeDisplayConver: state.conversations.changeDisplayConver,
//             selectedAllConversation: state.conversations.selectedAllConversation

//         }
//     },
//     {
//         editConversation: editConversation,
//         addConversationIdToEdit: addConversationIdToEdit,
//         removeConversationIdToEdit: removeConversationIdToEdit,
//         getConversations: getConversations

//     }
// )(Conversation)
