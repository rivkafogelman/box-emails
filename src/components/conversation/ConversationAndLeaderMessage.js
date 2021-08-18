import React, { useEffect, useState, useRef } from 'react'
import { FaFilter, FaLightbulb, FaCalendarAlt, FaDatabase, FaStar, FaFlag, FaFileAlt, FaHandshake, FaNetworkWired, FaPaperclip } from 'react-icons/fa'
import './Conversation.scss'
import { connect, useDispatch } from 'react-redux';
// import { editConversation, addConversationIdToEdit, removeConversationIdToEdit, getConversations, setSelectedConversation } from '../../redux/actions/conversation.actions'
import initService from '../../services/init.service'
import profileImg from '../../assets/Component 157 – 6.svg'
import imgFile from '../../assets/imageFile.svg'
import pdfFile from '../../assets/pdfFile.svg'
import wordFile from '../../assets/wordFile.svg'
import notReadedIcon from './assets/notReadedIcon.svg'
import readedIcon from './assets/readedIcon.svg'
import checkImg from '../../assets/check.svg'
import unCheckedFlag from '../../assets/flag.svg'
import uncheckedStarImg from '../../assets/fillGreyStar.svg'
import checkedStarImg from '../../assets/fillYellowStar.svg'
import conversationService from '../../services/conversation.service'
import Tooltip from '@material-ui/core/Tooltip';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'
import checkedFlag from '../../assets/redFlag.svg'
// import { addSpam, removeSpam } from '../../redux/actions/spam.action'
import { ExclamationOctagonFill } from 'react-bootstrap-icons';
import _ from 'lodash'
// import { setShowOpenConversation } from '../../redux/actions/displaySettings.actions';
import { Draggable } from 'react-beautiful-dnd';
import move from '../../assets/move.svg'
import file from '../../assets/file.svg'
import ContactProfile from '../contact-profile/ContactProfile'
import { actions } from '../../redux/actions/action'
import allText from '../../allText.json'
function Conversation(props) {

    const dispach = useDispatch();
    let userName = props.user.username
    const { changeDisplayConver } = props
    const [allTags, setAllTags] = useState([]);
    const [conversation, setConversation] = useState();
    const [wave, setWave] = useState({});
    const [tagsArray, setTags] = useState([]);
    const [tag, setTag] = useState(null);
    const flagRef = useRef(null)
    const [showFollowUpOption, setShowFollowUpOption] = useState(false)
    const [followUpDate, setFollowUpDate] = useState((new Date()).toISOString().split('T')[0])
    const [followUpTime, setFollowUpTime] = useState("09:00")
    const [followUpDateWithTime, setFollowUpDateWithTime] = useState(followUpDate.toString() + "T" + followUpTime.toString() + ":00.602Z")
    const [converDivDisplay, setConverDivDisplay] = useState('conversationDiv')
    const [bgc, setBgc] = useState('readedConversation')
    const [sId, setSID] = useState(null)
    const [starr, setStarr] = useState(false)
    const [drag, setDrag] = useState(true)
    const [changeColor, setChangeColor] = useState(false)

    useEffect(() => {

        setAllTags(props.tags);
        if (props.conversation) {
            setConversation(props.conversation);
            let newTagsArray = []
            // if (Object.prototype.toString.call(props.conversation.tag).indexOf("Array") > -1) {
            if (props.selectedListFlag !== props.flagsList.systemWaves) {
                props.conversation.tags.forEach(t => {
                    let tag = props.tags.find(T => T._id === t)
                    if (tag)
                        newTagsArray.push(tag)
                })
            }
            console.log("arrayTag in conversation")
            // }
            // else {
            //     let tag = props.tags.find(t => t._id === props.conversation.tag)
            //     if (tag)
            //         newTagsArray.push(tag)
            //     console.log("tagArray", tagsArray)
            // }
            setTags(newTagsArray)
            // console.log(props.conversation.tag)
            // console.log(props.tags.find(t => t._id === props.conversation.tag))
            // setTag(props.tags.find(t => t._id === props.conversation.tag))
        }
        if (props.conversation.waves) {
            if (props.conversation.waves.length) {
                setWave(props.conversation.waves[props.conversation.waves.length - 1]);
            }
        }
        else {
            //for system wave
            setWave(props.conversation)
        }
        if (followUpTime || followUpDate) {
            setFollowUpDateWithTime(followUpDate.toString() + "T" + followUpTime.toString() + ":00.602Z")
        }
    }, [props.tags, props.conversation, props.startDrag, followUpDate, followUpTime])

    // useEffect(() => {
    //     props.addConversationIdToEdit(props.selectedConversation._id)
    //     //to get the prev and slice it!!!!!!
    // }, [props.selectedConversation])

    const getWaveBodyText = (waveBody) => {

        let text = waveBody.split('<');
        let textString = "";
        for (let i = 0; i < text.length - 1; i++) {
            text[i] = text[i].substring(text[i].indexOf('>') + 1)
            if (i > 0) {
                // this is for display the useremail in <>
                text[i] = text[i].replaceAll('&lt;', '<');
                text[i] = text[i].replaceAll('&gt;', '>');
                textString += " " + text[i]
            }
        }
        return textString
    }
    useEffect(() => {
        if (props.changeDisplayConver) {
            // setBgc('readedConversation')
            setConverDivDisplay('conversationDiv')
        }
        else {
            // setBgc('changeColor')
            setConverDivDisplay('smallDivConver')
        }
    }, [props.changeDisplayConver])

    const displayFromOrTo = () => {
        if (conversation.waves) {
            let userName = props.init.userName
            //for sent list -display the recipients
            if (props.selectedListFlag === props.flagsList.sent) {
                let recipientsArray = []
                conversation.waves.forEach(w => {
                    w.to.forEach(t => {
                        recipientsArray.push(t)
                    })
                })
                // display only once each sender
                let filteredRecipients = _.uniq(recipientsArray)
                let len = filteredRecipients.length
                return (<><span>To: </span>{
                    filteredRecipients.map(to => <>
                        <span className="contactHref" >
                            {to === userName ? 'me' : to}
                        </span>
                        {--len !== 0 && <span className="contactLinkComma">, </span>}
                    </>)
                }</>)
            }
            else {
                let fromArray = []
                conversation.waves.forEach(w => {
                    if (w.from)
                        fromArray.push(w.from)
                });
                // display only once each sender
                let filteredFrom = _.uniq(fromArray)
                let len = filteredFrom.length
                return (
                    filteredFrom.map(from => <>
                        <span className="contactHref" >
                            {from === userName ? 'me' : from}
                        </span>
                        {--len !== 0 && <span className="contactLinkComma">, </span>}
                    </>)
                )
            }
        }
    }

    // const refToContact = (myEmail) => {
    //     //wave.from contain username and in the old versions - username@mail.leader.codes
    //     if (myEmail.indexOf('@') === -1 || myEmail.indexOf('@mail.leader.codes') !== -1) {
    //         let uName = myEmail.slice(0, myEmail.indexOf('@'))
    //         initService.getUser(uName).then((user) => {
    //             window.open(
    //                 `https://contacts.dev.leader.codes/${userName}?c=${user.email}`,
    //                 '_blank'
    //             );
    //         }).catch((err) => {
    //             alert(err)
    //         })
    //     }

    //     //if it's gmail email
    //     else {
    //         window.open(
    //             `https://contacts.dev.leader.codes/${userName}?c=${myEmail}`,
    //             '_blank'
    //         );
    //     }
    // }

    const downloadFile = (event, url) => {
        let type = url.substring(url.indexOf('__') + 2)
        type = type.substring(type.indexOf('.') + 1)

        event.stopPropagation()
        conversationService.downloadFile(url, type).then(() => {
        }).catch((err) => {
            console.log(err)
        })
    }
    const addToSelected = (e) => {
        e.stopPropagation()
        if (props.conversation.source !== 'google') {
            props.addConversationIdToEdit(conversation._id)
        }
    }

    const removeToSelect = (e) => {
        e.stopPropagation()
        props.removeConversationIdToEdit(conversation._id)
    }

    const getSrc = (f) => {

        let x = f.substring(f.indexOf('__') + 2)
        x = x.substring(x.indexOf('.') + 1)
        switch (x.toLowerCase()) {
            case "png":
                return imgFile
            case "pdf":
                return pdfFile
            case "word":
                return wordFile
            default:
                break;
        }
    }

    const popover = (

        <Popover id="popover-basic" className="flagPopover" onClick={(e) => { e.stopPropagation() }}>
            <Popover.Content>
                <div>
                    <svg onClick={() => setShowFollowUpOption(false)} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <h6 className="flagTitel">Follow Up Time</h6>
                <input className="inputFlag"
                    type="time"
                    value={followUpTime}
                    onChange={(e => { setFollowUpTime(e.target.value); setFollowUpDateWithTime(followUpDate.toString() + "T" + e.target.value.toString() + ":00.602Z") })} ></input>
                <br></br>

                <input className="inputFlag" type="date" value={followUpDate} onChange={(e => { setFollowUpDate(e.target.value); setFollowUpDateWithTime(e.target.value.toString() + "T" + followUpTime.toString() + ":00.602Z") })}></input>
                <br></br>
                <div className=" d-flex justify-content-center">
                    <Button className="saveFlag" onClick={async (e) => {
                        // setFlag(redFlag)
                        // !conversation.flagged.bool
                        setShowFollowUpOption(false);
                        followUpClick(true)

                        await props.editConversationServer({ _id: conversation._id, flagged: { bool: true, date: followUpDateWithTime } }, "followUp"); e.stopPropagation()

                    }}>Save</Button>
                </div>
            </Popover.Content>
        </Popover>

    );

    const getSourceImg = () => {
        let img = props.sourcesArray.find(s => s.name.toLowerCase() === conversation.source.toLowerCase())
        if (img)
            return <img src={img.lightIcon} alt="?"></img>
    }

    const displayFromOrToInLine = () => {
        return (
            props.selectedListFlag === props.flagsList.systemWaves &&
            <div className={`fromAndNum ${!changeDisplayConver && 'col-4 converBlock'}`}>
                <div className="fromNames">
                    <span className={`${!conversation.readed ? `bold` : ``}`}>
                        {conversation.source}
                    </span>
                </div>
            </div>
            ||
            <div className={`fromAndNum ${!changeDisplayConver && 'col-4 converBlock'}`}>
                <div className="fromNames">
                    <span className={`${!conversation.readed ? `bold` : ``}`}>
                        {displayFromOrTo()}
                        {conversation.waves && conversation.waves.length > 1 && <span className="numWaves">{conversation.waves.length}</span>}
                    </span>
                </div>
            </div>
        )
    }

    const displayBody = () => {
        return (
            <div className={`waveBody ${!changeDisplayConver && 'col-5 converBlock'}`}>
                {tagsArray &&
                    tagsArray.map(tag =>
                    (
                        <div className="tagInConv" style={{ backgroundColor: tag.color }} >{tag.title}</div>
                    ))
                }
                {wave.body && getWaveBodyText(wave.body)}
            </div>
        )
    }

    const starConversationClick = (starred) => {
        let newConversationdd = { ...conversation }
        newConversationdd.starred = starred
        setConversation(newConversationdd)
    }

    const followUpClick = (follow) => {
        let newConversation = { ...conversation }
        newConversation.flagged = follow
        setConversation(newConversation)
    }


    return (
        <>{conversation && (props.selectedListFlag === props.flagsList.systemWaves || conversation.waves) &&
            <div className="conversationAndLeaderDiv" style={{ position: 'relative' }}>
                <>
                    <Draggable draggableId={props.conversation._id} index={props.index}>

                        {provided => (
                            <div {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {props.startDrag === true && props.draggableIdConversation == props.conversation._id ?
                                    <img src={move}></img> :
                                    <div>

                                        <div style={{ position: 'absolute', opacity: 0, top: '25px', width: '70%', height: '80%', right: '40px', left: '50px' }}
                                            className={`${converDivDisplay} ${!changeDisplayConver ? 'row ' : ''} ${conversation.readed ? `readedConversation` : ``}
                                            ${props.selectedConversation && props.selectedConversation != "empty"
                                                    && conversation._id && props.selectedConversation._id && conversation._id === props.selectedConversation._id
                                                    ? `selectedConversation` : ``} `}></div>
                                    </div>}
                            </div>
                        )}
                    </Draggable>
                    <div
                        className={`${converDivDisplay} ${!changeDisplayConver && 'row '} ${conversation.readed ? `readedConversation` : ``} 
                            ${props.conversationsIdsToEdit.find(id => id === props.conversation._id) ? `checkedConversation` : ``}
                            ${props.selectedConversation && props.selectedConversation != "empty"
                            && conversation._id && props.selectedConversation._id && conversation._id === props.selectedConversation._id
                            && `selectedConversation`} `}>

                        <div className={`leftDiv ${!changeDisplayConver && 'col-1'}`}>

                            {props.conversationsIdsToEdit.find(id => id === props.conversation._id) &&
                                <div className={`avatar ${props.changeDisplayConver ? 'nameLettersBig ' : 'nameLettersSmall '}  showChecked`} onClick={removeToSelect} style={{width:"33px",height:"33px"}}><img src={checkImg} alt="V" ></img></div>
                                ||
                                <div className="warpProfile" onClick={(e) => { addToSelected(e) }}>
                                    {
                                        props.selectedListFlag === props.flagsList.systemWaves ?
                                            <ContactProfile source={conversation.source} /> :
                                            <ContactProfile conversation={conversation} />
                                    }
                                </div>
                            }
                        </div>
                        <div className={`${changeDisplayConver && 'centeralDiv'} ${!changeDisplayConver && 'col-10 row'}`}>
                            {displayFromOrToInLine()}
                            <div className={`subject ${conversation.readed === false && "bold"} ${!changeDisplayConver && 'col-3 converBlock '} `}>
                                {conversation.fwd && <span>Fwd: </span>}
                                <span>
                                    {conversation.subject ? conversation.subject : "(no subject)"}
                                </span>
                            </div>
                            {displayBody()}
                        </div>
                        <div className={`dateAndMore ${!changeDisplayConver ? 'col-1' : 'high'}`} >
                            <div className="dateLine">
                                <span className="conversationDate">
                                    {wave.timestamp && conversationService.getTime(wave.timestamp)}
                                </span>
                                {props.selectedListFlag !== props.flagsList.systemWaves && props.selectedListFlag !== props.flagsList.trash &&
                                    <Tooltip title={conversation.starred == true ? allText.conversation.removeStar : allText.conversation.addStar}>
                                        <img className="starIcon" alt="" src={conversation.starred == true && checkedStarImg || uncheckedStarImg}
                                            onClick={async (e) => {
                                                e.stopPropagation()
                                                starConversationClick(!conversation.starred)
                                                await dispach(actions.editConversationServer({ _id: conversation._id, starred: !conversation.starred }, "starred"))
                                            }}
                                        />
                                    </Tooltip>
                                }
                                {props.selectedListFlag === props.flagsList.box &&
                                    <Tooltip title={conversation.spam == true ? allText.conversation.removeSpam : allText.conversation.addSpam}>
                                        <ExclamationOctagonFill className="spamInBox" color={sId === props.conversation._id && "rgb(179, 0, 0)" || "rgba(0,0,0,.1)"} size={17}
                                            onClick={async (e) => {

                                                setSID(props.conversation._id)
                                                // alert("spam!")
                                                e.stopPropagation()
                                                await props.editConversationServer({ _id: conversation._id, spam: true }, "spam")
                                                let i = props.conversation._id
                                                let tempConversation = props.allConversations.find(c => c._id === i)
                                                let tempFrom = tempConversation.waves[0].from

                                                // alert(tempFrom)
                                                if (tempFrom === userName) { return }

                                                let tempContact = ''

                                                if (!(tempFrom && tempFrom.includes(`@`))) {
                                                    tempContact = props.contacts.find(s => s.name == tempFrom)
                                                    if (tempContact === undefined)
                                                        return
                                                    else
                                                        tempContact = props.contacts.find(s => s.name == tempFrom)._id
                                                }
                                                else {
                                                    tempContact = props.contacts.find(s => s.email == tempFrom)
                                                    if (tempContact === undefined)
                                                        return
                                                    else
                                                        tempContact = props.contacts.find(s => s.email == tempFrom)._id
                                                }
                                                props.addSpam(tempContact)
                                            }} />

                                    </Tooltip>
                                }
                                {props.selectedListFlag === props.flagsList.spam &&
                                    <Tooltip title={conversation.spam == true ? allText.conversation.removeSpam : allText.conversation.addSpam}>
                                        <ExclamationOctagonFill className="spam" color="rgb(179, 0, 0)" size={18}
                                            onClick={async (e) => {
                                                e.stopPropagation()
                                                await props.editConversationServer({ _id: conversation._id, spam: false }, "spam")
                                                let i = props.conversation._id
                                                let tempConversation = props.allConversations.find(c => c._id === i)
                                                let tempFrom = tempConversation.waves[0].from
                                                if (tempFrom === userName) { return }
                                                let tempContact = ''
                                                if (!(tempFrom && tempFrom.includes(`@`)))
                                                    tempContact = props.contacts.find(s => s.name == tempFrom)._id
                                                else
                                                    tempContact = props.contacts.find(s => s.email == tempFrom)._id
                                                props.removeSpam(tempContact)
                                            }} />

                                    </Tooltip>
                                }

                                {props.selectedListFlag !== props.flagsList.systemWaves && props.selectedListFlag !== props.flagsList.trash && <span>
                                    <OverlayTrigger show={showFollowUpOption} placement={`${props.showOpenConversation ? "right" : "left"}`} overlay={popover}>
                                        <Tooltip title="Add Follow Up">
                                            {/* {conversation.flagged.bool ? flag = redFlag : flag = flagImg} */}
                                            <img className="followUpIcon" alt="" src={conversation.flagged && conversation.flagged.bool ? checkedFlag : unCheckedFlag}
                                                ref={flagRef} className={`conversationFlag`}
                                                onClick={async (e) => {
                                                    e.stopPropagation()
                                                    followUpClick(false)
                                                    if (conversation.flagged && conversation.flagged.bool) {
                                                        await props.editConversationServer({ _id: conversation._id, flagged: { bool: false, date: followUpDateWithTime } }, 'followUp')
                                                        setShowFollowUpOption(false)
                                                    }
                                                    else
                                                        setShowFollowUpOption(true)

                                                }}
                                            >
                                            </img>
                                        </Tooltip>
                                    </OverlayTrigger>
                                </span>
                                }
                                {/* <Tooltip title="Readed by recipients">
                                    <span><input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" checked={conversation.readed}></input></span>
                                </Tooltip> */}
                            </div>
                            <div className="readedAndFile">
                                {wave.files && wave.files.length !== 0 && <img src={file} className="fileInConv"></img>}
                                {props.selectedListFlag === props.flagsList.sent ? <Tooltip title={conversation.readedByRecipients.length ? "Readed by recipients" : "Not readed by recipients"}>
                                    <img src={conversation.readedByRecipients.length ? readedIcon : notReadedIcon}></img>
                                </Tooltip> : ``}
                            </div>
                        </div>
                    </div>
                </>
                {/* } */}
            </div>
        }</>

    )
}

export default connect(
    (state) => {
        return {
            tags: state.tags.tags,
            allUserContacts: state.init.contacts,
            selectedConversation: state.conversations.selectedConversation,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
            user: state.init.user,
            selectedListFlag: state.conversations.selectedListFlag,
            flagsList: state.conversations.flagsList,
            // displaySystemWaves: state.conversations.displaySystemWaves,
            contacts: state.init.contacts,
            sourcesArray: state.init.sources,
            changeDisplayConver: state.conversations.changeDisplayConver,
            allConversations: state.conversations.allConversations,
            init: state.init,
            draggableIdConversation: state.conversations.draggableIdConversation,
            startDrag: state.conversations.startDrag

        }
    },
    (dispatch) => ({
        removeConversationIdToEdit: (val) => { dispatch(actions.removeConversationIdToEdit(val)) },
        addConversationIdToEdit: (val) => { dispatch(actions.addConversationIdToEdit(val)) },
        editConversationServer: (val) => { dispatch(actions.editConversationServer(val)) },
        getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val)) },
        addSpam: (val) => { dispatch(actions.addSpam(val)) },
        removeSpam: (val) => { dispatch(actions.removeSpam(val)) },
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val)) },
        setShowOpenConversation: (val) => { dispatch(actions.setShowOpenConversation(val)) },

    })
)(Conversation)

{/* {dragId &&
                          <Droppable >
                            {provided => (
                              <div className='innerDivv'
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <div class="card" style={{ width: 50 }}>
                                  <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                  </div>
                                </div>
                             </div>
                            )}
                          </Droppable>
                        } */}

