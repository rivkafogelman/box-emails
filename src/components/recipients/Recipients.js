import { connect } from "react-redux"
import React, { useState, useEffect, useRef } from 'react'
import './Recipients.scss'
import $ from 'jquery'
import Tooltip from '@material-ui/core/Tooltip';
// import { deleteGroup, addGroup } from '../../redux/actions/group.actions'
// all text
import allText from '../../allText.json'
import plusMiniGrey from '../new-message/assets/plusMiniGrey.svg'
import { FaTimes, FaRegBell, FaChevronDown, FaAngleDown } from 'react-icons/fa'
import profileImg from '../../assets/Component 157 – 6.svg'
import groupCircle from './assets/groupCircle.svg'
import ContactProfile from '../contact-profile/ContactProfile'
import { Dropdown } from 'semantic-ui-react'
import replyIcon from '../../assets/Group 21360.svg'
import replyAllIcon from '../../assets/Group 21361.svg'
import forwardIcon from '../../assets/forward.svg'
import { ReplyAll } from "react-bootstrap-icons";
import { actions } from '../../redux/actions/action'
import groupService from '../../services/group.service'
import soonIcon from './assets/soon.svg'

function Recipients(props) {

    const [displayCreateGroup, setDisplayCreateGroup] = useState(false)
    const [displayCreateGroupBtn, setDisplayCreateGroupBtn] = useState(false)
    const [displayContacts, setDisplayContacts] = useState(false)
    const [teamsList, setTeamsList] = useState([])
    const [groupsList, setGroupsList] = useState([])
    const [contactsList, setContactsList] = useState([])
    const [displayPush, setDisplayPush] = useState(false)
    const newMessageToP = useRef(null),
        newMessageTo = useRef(null),
        groupNameInpt = React.createRef()
    const [groupNameExists, setGroupNameExists] = useState(false)
    const [currentTypeTo, setCurrentTypeTo] = useState('')
    const [cursor, setCursor] = useState(0)
    const [editRecipient, setEditClickRecipient] = useState(false)
    const [toOption, setToOption] = useState(allText.recipient.email);


    useEffect(() => {
        setDisplayContacts(contactsList.length !== 0 || groupsList.length !== 0 || teamsList.length !== 0 || displayPush === true)
        newMessageToP && newMessageToP.current && newMessageToP.current.focus()
    }, [newMessageToP.current, contactsList, groupsList, displayPush])

    useEffect(() => {
        setContactsList([])
        setGroupsList([])
        // setEditClickRecipient(-1)
        if (newMessageToP.current) {
            newMessageToP.current.innerHTML = ""
        }
        setDisplayContacts(false)
        setDisplayPush(false)
        let length = returnContactsForGroup(false)
        if (length > 1) {
            setDisplayCreateGroupBtn(true)
        }
        else {
            setDisplayCreateGroupBtn(false)
        }
    }, [props.recipients, props.isNotification])

    // change option in dropdown remove the push span;
    useEffect(() => {
        if (toOption !== allText.recipient.notification && props.setIsNotification)
            props.setIsNotification(false)
    }, [toOption]);

    const newMessageBlur = (e) => {
        if (editRecipient && e.target.id !== "newMessageTo" || !editRecipient)
            if (!e.relatedTarget || e.relatedTarget && e.relatedTarget.id !== "contactsForMessageCard")
                emailKeyUp(e, "to")
        setCursor(0);
    }

    const returnContactsForGroup = (returnFiltered) => {
        let withoutDuplicatesContacts = [], count = 0
        props.recipients.map(r => {
            if (!withoutDuplicatesContacts.find(w => w.email === r.email)) {
                withoutDuplicatesContacts.push(r)
                if (r.type === "contact") {
                    count++
                }
            }
        })
        if (returnFiltered) {
            return withoutDuplicatesContacts
        }
        return count
    }
    const getContactsForGroup = () => {
        //change the function to return also not contact emails!!!!
        return (
            <>
                {props.recipients.map(recipient =>
                    <>{recipient && (recipient.type === "contact" || recipient.type === "email") &&
                        < span contentEditable="false" className={`messageEmail correctEmail`}>{recipient.contactName}
                            <span onClick={() =>
                                props.setRecipients(props.recipients.filter((item) => (item !== recipient)))
                            }>
                                {!props.fromSearch ? <FaTimes /> : ','}
                                {/* <FaTimes /> */}
                            </span>
                        </span>
                    }</>
                )
                }
            </>

        )
    }
    const getContactsForGroupOld = () => {
        //return only contacts emails
        return (
            <>
                {props.recipients.map(recipient =>
                    <>{recipient && recipient.type === "contact" &&
                        < span contentEditable="false" className={`messageEmail correctEmail`}>{recipient.contactName}
                            <span onClick={() =>
                                props.setRecipients(props.recipients.filter((item) => (item !== recipient)))
                            }>
                                {!props.fromSearch ? <FaTimes /> : ','}
                                {/* <FaTimes /> */}
                            </span>
                        </span>
                    }</>
                )
                }
            </>
        )
    }
    const ValidateEmail = (mail) => {
        console.log(mail);
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(mail) === true
    }
    const searchContact = async (text, type) => {
        setContactsList([])
        setGroupsList([])
        setTeamsList([])
        setDisplayPush(false)
        if (text === "") {
            setCursor(0)
        }
        if (text != "") {
            await props.contacts.forEach(async (contact) => {
                if (contact.email && contact.email.toLowerCase().indexOf(text.toLowerCase()) === 0 ||
                    contact.name != undefined && contact.name.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                    await setContactsList(oldArray => [...oldArray, contact]);
                }
            });
            await props.groups.length && props.groups.forEach(async (g) => {
                if (g.groupName.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                    await setGroupsList(oldArray => [...oldArray, g.groupName]);
                }
            });
            await props.teams.forEach(async (t) => {
                if (t.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                    await setTeamsList(oldArray => [...oldArray, t]);
                }
            });
            if (cursor > contactsList.length + groupsList.length + teamsList.length) {
                setCursor(0)
            }
            if ("push:".toLowerCase().indexOf(text.toLowerCase()) === 0) {
                setDisplayPush(true);
                console.log('display true success')
            }
        }
    }

    const chooseNotification = () => {
        props.setIsNotification(true)
        props.setRecipients([])
    }
    const emailKeyUp = (e, type) => {

        if (props.isNotification !== null && e.target.textContent === "push:") {
            props.setIsNotification(true)
            props.setRecipients([])
            return
        }
        if (e.target.id !== "") {
            let recipientObj
            setCurrentTypeTo(type)
            if (e.key === "Enter" || e.type === "blur") {

                if (!displayContacts) {
                    //if Edit recipient
                    if (editRecipient) {
                        if (e.target.innerText) {
                            let valid = ValidateEmail(e.target.innerText)
                            recipientObj = { "type": "email", "email": e.target.innerText, "valid": valid }
                            props.setRecipients(oldArray => [...oldArray, recipientObj])
                        }
                    }
                    //if key Enter
                    else
                        if (newMessageToP.current.textContent === "") {
                            newMessageToP.current.innerHTML = ""
                        }
                        else {
                            let valid = ValidateEmail(newMessageToP.current.textContent)
                            recipientObj = { "type": "email", "email": newMessageToP.current.textContent, "valid": valid }
                            props.setRecipients(oldArray => [...oldArray, recipientObj])
                        }
                }
                else if (cursor < contactsList.length && contactsList.length !== 0) {
                    recipientObj = { "type": "contact", "email": contactsList[cursor].email, "contactName": contactsList[cursor].name, "contactId": contactsList[cursor]._id }
                    props.setRecipients(oldArray => [...oldArray, recipientObj])

                    setCursor(0);
                }
                else if (cursor - contactsList.length < groupsList.length && groupsList.length !== 0) {
                    recipientObj = { type: "group", groupName: groupsList[cursor - contactsList.length] }
                    props.setRecipients(oldArray => [...oldArray, recipientObj])

                    setCursor(0);
                }
                else if (displayPush) {
                    props.setIsNotification(true)
                }
            }
            else if (e.type === "blur") {
                // insert Contact
                console.log(" blur")
                if (displayContacts === true && contactsList.length > 0) {
                    recipientObj = { "type": "contact", "email": contactsList[0].email, "contactName": contactsList[0].name, "contactId": contactsList[0]._id }
                    props.setRecipients(oldArray => [...oldArray, recipientObj])
                }
                else {
                    if (groupsList.length) {
                        let recipientObj = { type: "group", groupName: groupsList[0] }
                        props.setRecipients(oldArray => [...oldArray, recipientObj])
                    }
                    else if (displayPush) {
                        props.setIsNotification(true)
                    }
                    //insert not-contact email
                    else if (newMessageToP.current.textContent) {
                        let valid = ValidateEmail(newMessageToP.current.textContent)
                        recipientObj = { "type": "email", "email": newMessageToP.current.textContent, "valid": valid }
                        props.setRecipients(oldArray => [...oldArray, recipientObj])
                    }
                }
                setCursor(0);
                e.preventDefault()
            }
            else {
                if (e.key === "ArrowDown" && e.target.innerText === "") {
                    setContactsList([...props.contacts]);
                    setGroupsList([]);
                    props.groups.forEach(async (g) => {
                        setGroupsList(oldArray => [...oldArray, g.groupName]);
                    })
                    setTeamsList([...props.teams])
                }
                //search contact for the press
                else if (e.key !== "ArrowUp") {
                    searchContact(e.target.innerText)
                }
            }
            e.stopPropagation()
        }
    }
    const handleKeyDown = (e) => {
        // arrow up/down button should select next/previous list element     
        let length = contactsList.length + groupsList.length;
        if (e.keyCode === 38) {
            e.preventDefault();
            if (cursor > 0) {
                if (cursor > 4) {
                    $(".contactsForMessageCard").scrollTop(0);
                    $(".contactsForMessageCard").scrollTop($('.activeContactNameAndEmail').offset().top - 540);
                }
                setCursor(x => x - 1)
                console.log("cursor" + cursor)
            }
        } else if (e.keyCode === 40) {
            e.preventDefault();
            if (cursor < length - 1) {

                setCursor(x => x + 1)
                if (cursor > 4) {
                    $(".contactsForMessageCard").scrollTop(0);
                    $(".contactsForMessageCard").scrollTop($('.activeContactNameAndEmail').offset().top - 142);
                }
            }
        }

    }
    const showContacts = () => {
        return (<>{displayContacts &&
            <div tabIndex={0} id="contactsForMessageCard" className={`card ${props.fromSearch && 'contactsForMessageCardinSearch'} contactsForMessageCard type${currentTypeTo} `} onBlur={() => {
                setDisplayContacts(false)
            }}>
                {contactsList.map((contact, index) =>
                    <div className={`contactNameAndEmail d-flex ${cursor === index ? "activeContactNameAndEmail" : ""}`} onClick={(e) => {
                        let recipientObj = { type: "contact", contactName: contact.name, email: contact.email, contactId: contact._id }
                        setCursor(0);
                        props.setRecipients(oldArray => [...oldArray, recipientObj])
                        newMessageToP.current.focus()
                        e.stopPropagation()
                    }}>
                        <ContactProfile contact={contact} />
                        <div className="profile">
                            <div className="contactName">{contact.name}</div>
                            <div className="contactEmail">{contact.email}</div>
                        </div>
                    </div>
                )}
                {groupsList.map((g, index) =>
                    <div className={`contactNameAndEmail d-flex ${cursor - contactsList.length === index ? "activeContactNameAndEmail" : ""}`} onClick={(e) => {
                        let recipientObj = { type: "group", groupName: g }
                        setCursor(0);
                        props.setRecipients(oldArray => [...oldArray, recipientObj])
                        newMessageToP.current.focus()
                        e.stopPropagation()
                    }}
                        onMouseOver={() => { setCursor(index + contactsList.length) }}
                    >
                        <div className="profile">
                            <img src={groupCircle} className="contactImg"></img>
                        </div>
                        <div className="groupInList">
                            <div className="contactName">{g}</div>
                        </div>
                    </div>
                )}
                {
                    displayPush === true &&
                    <div className="contactNameAndEmail d-flex" onClick={(e) => {
                        setDisplayPush(false)
                        props.setIsNotification(true)
                    }}>
                        <div className='profile'>
                            <FaRegBell className='p-auto contactImg notificationIcon' />
                        </div>
                        <div className="groupInList">
                            <div clssName="contactName">
                                Notification
                            </div>
                        </div>
                    </div>
                }
            </div>
        }</>)
    }
    const changeEditRecipient = (index) => {
        setEditClickRecipient(!editRecipient)
    }
    const getRecipients = () => {
        console.log("in getRecipients")
        let recipientsList = []
        if (props.recipients.length > 0) {
            props.recipients.map((recipient, index) => {
                if (recipient) {
                    switch (recipient.type) {
                        case "group":
                            ///add edited to recipient
                            if (!editRecipient)
                                recipientsList.push(
                                    <div contentEditable="false" className={`messageEmail group`} onDoubleClick={(e) => { changeEditRecipient(index); }} >{recipient.groupName}
                                        <span onClick={(e) => { props.setRecipients(props.recipients.filter((item) => (item !== recipient))); e.stopPropagation() }}><FaTimes />
                                        </span>
                                    </div>
                                )
                            else
                                recipientsList.push(
                                    <>
                                        {/* <div> */}
                                        <div onDoubleClick={(e) => newMessageBlur}  >
                                            <p tabIndex="-1" contentEditable="true" name="newMessageToP" onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => emailKeyUp(e, "to")} onFocus={() => { if (contactsList.length || groupsList.length) setDisplayContacts(true) }}>{recipient.groupName}</p>
                                            {/* <p contentEditable="true"   >{recipient.groupName}</p>   */}
                                            {/* <div tabIndex="0" onBlur={newMessageBlur} className="newMessageTo" ref={newMessageTo} > */}
                                            {/* <p tabIndex="-1" contentEditable="true" id="newMessageToP" ref={newMessageToP} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => emailKeyUp(e, "to")} onFocus={() => { if (contactsList.length > 0) setDisplayContacts(true) }}>{recipient.groupName}</p> */}
                                            {/* <div contentEditable="true" id="p1" onBlur={newMessageBlur} >{recipient.groupName}</div>      */}
                                        </div>
                                        {/* </div> */}
                                    </>
                                )
                            break;
                        case "email":
                            recipientsList.push(
                                <span contentEditable="false" className={`messageEmail ${recipient.valid ? `  correctEmail` : ` incorrectEmail`}`}>{recipient.email}
                                    <span onClick={(e) => { props.setRecipients(props.recipients.filter((item) => (item !== recipient))); e.stopPropagation() }}><FaTimes />
                                    </span>
                                </span>
                            )
                            break;
                        case "contact":
                            recipientsList.push(
                                <span contentEditable="false" className={`messageEmail correctEmail`}>{recipient.contactName}
                                    <span onClick={(e) => { props.setRecipients(props.recipients.filter((item) => (item !== recipient))); e.stopPropagation() }}><FaTimes />
                                    </span>
                                </span>
                            )
                            break;
                        default:
                            break;
                    }
                }
            })
        }
        console.log("getRecipients", recipientsList)
        return (
            recipientsList.map(r => r)
        )
    }

    const createGroupBtnClicked = (e) => {
        if (props.groups.length < 3 || props.user.premium) {
            console.log("premium", props.user.premium)
            e.stopPropagation()
            let recipients = returnContactsForGroup(true)
            props.setRecipients(recipients)
            setDisplayCreateGroup(true)
        }
        else {
            alert('You already have 3 groups or you not premium')
        }
    }
    const groupNameFocus = () => {
        groupNameInpt.current.classList.remove("invalidName")
        setGroupNameExists(false)
    }

    
    const createGroup = async (e) => {
        //change to get also not contact emails
        //and send emails and not contacts id's
        let name = groupNameInpt.current.value,
            nameExists = false
        if (name) {
            props.groups.forEach(g => {
                if (g.groupName.toLowerCase() === name.toLowerCase()) {
                    nameExists = true
                }
            })
            if (nameExists) {
                groupNameInpt.current.classList.add("invalidName")
                setGroupNameExists(true)
            }
            else {
                groupNameInpt.current.classList.remove("invalidName")
                setGroupNameExists(false)
                let contactsForGroup = []
                props.recipients.forEach(recipient => {
                    if (recipient.type === "contact" || recipient.type === "email") {
                        contactsForGroup.push(recipient.email)
                    }
                })
                let group = {
                    "groupName": name,
                    "members": contactsForGroup
                }
                // await props.addGroupServer({ group: group })

                await groupService.addNewGroup({ group: group }, props.selectedSubUser, props.jwt).then((data) => {
                    debugger
                    props.setRecipients(props.recipients.filter(r => r.type !== "contact" && (r.type !== "email" && r.valid === true)))
                    let recipientObj = { type: "group", groupName: name }
                    props.setRecipients(oldArray => [...oldArray, recipientObj])
                    setDisplayCreateGroup(false)
                    if (data.group)
                        props.addGroup(data.group)
                    if (data.newContacts)
                        props.setNewContacts(data.newContacts)
                }).catch((err) => {
                    // alert('faild to create')
                })

                //to change only on success!!!!!!
                //remove the prev recipients and add the group instead, in the recipients line

            }
        }
        else {
            groupNameInpt.current.classList.add("invalidName")
        }
    }


    const closeGroupClicked = () => {
        setDisplayCreateGroup(false)
    }
    const getNotification = () => {
        return (
            <span style={{ backgroundColor: 'purple' }} contentEditable="false" className={`messageEmail notification`}>
                <span onClick={() => props.setIsNotification(false)}><FaRegBell /></span>
                {allText.recipient.push}:
                <span onClick={() => { props.setIsNotification(false); setToOption(allText.recipient.email) }}><FaTimes />
                </span>
            </span>)
    }


    const dropdown = () => {
        return (
            <Dropdown className={`col-${props.expand ? '2' : '3'} dropdownToOptions`}
                trigger={<div className={`toOptionActive toOptionActive${toOption} justify-content-center align-items-center`}
                >{toOption} <FaAngleDown style={{ margin: '3px 0px 0px 3px' }} /></div>}
                icon={null}>
                <Dropdown.Menu className='dropdownToOptionsMenu'>
                    <Dropdown.Item onClick={x => setToOption(allText.recipient.email)} style={{ display: toOption === allText.recipient.email ? 'none' : 'block' }}>
                        <div className="toOption toOptionEmail">{allText.recipient.email}</div>
                    </Dropdown.Item>
                    {/* {(props.groups.length < 3 || props.user.premium) && */}
                    <Dropdown.Item onClick={x => setToOption(allText.recipient.createGroup)} style={{ display: (!displayCreateGroupBtn || toOption === allText.recipient.createGroup) ? 'none' : 'block' }}>
                        <div className="toOption toOptionCreate"
                            onClick={(e) => createGroupBtnClicked(e)}>{allText.recipient.createGroup}</div>
                    </Dropdown.Item>
                    {/* } */}
                    <Dropdown.Item 
                   // onClick={x => setToOption(allText.recipient.notification)} comming soon!
                    style={{ display: toOption === allText.recipient.notification ? 'none' : 'block' }} >
                        <div className="toOption toOptionNotification " 
                           // onClick={chooseNotification} comming soon!
                            >{allText.recipient.notification}<img src={soonIcon} alt ="" style={{height:"15px",width:"33px"}}></img></div>
                            
                    </Dropdown.Item>
                    {/* not available! */}
                    {/* <Dropdown.Item onClick={x => setToOption(allText.recipient.sms)} style={{ display: toOption === allText.recipient.sms ? 'none' : 'block' }}>
                        <div className="toOption toOptionSms">{allText.recipient.sms}</div>
                    </Dropdown.Item> */}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    // get src for reply icon
    const replyTypeSrc = () => {
        switch (props.replyType) {
            case 'forward': return forwardIcon;
            case 'replyAll': return replyAllIcon;
            case 'reply': return replyIcon;
            default: return null;
        }
    }

    return (
        <>
            <div onClick={() => {
                newMessageToP && newMessageToP.current && newMessageToP.current.focus()
            }}>
                {!displayCreateGroup ?
                    <>
                        <div tabIndex="0" onBlur={newMessageBlur} className="newMessageTo" id="newMessageTo" ref={newMessageTo} >
                            {props.replyType && <img
                                className={`col-1${props.expand ? 'Expand ' : ' '}replyTypeIcon`}
                                src={replyTypeSrc()}
                            />}
                            {(props.fromSearch === undefined || (props.fromSearch && props.recipients.length === 0)) &&
                                <span className={`col-1${props.expand ? 'Expand ' : ' '} ${props.fromSearch ? 'fromSearchSpan' : ''} `}>{`${props.fromField ? "From" : allText.recipient.to}: `}</span>}
                            <div className={props.replyType ? `col-${props.expand ? '11' : '10'}` : `col-${props.expand ? '9' : '8'}`}>
                                <div>
                                    {props.isNotification ? getNotification() : props.recipients ? getRecipients() : ``}
                                </div>
                                <p tabIndex="-1" contentEditable="true" id="newMessageToP" ref={newMessageToP} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => emailKeyUp(e, "to")} onFocus={() => { if (contactsList.length > 0) setDisplayContacts(true) }}></p>
                            </div>
                            {!props.replyType && dropdown()}
                        </div>
                    </>
                    : <div className="warpCreateGroup">
                        <div className="firstLine">
                            <div>
                                <input className="groupName" ref={groupNameInpt} placeholder="*Group name" maxLength="20" onFocus={groupNameFocus}></input>
                                {groupNameExists && <small className="nameExistsError">{allText.group.existsName}</small>}
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-success createNewGroupBtn" onClick={createGroup}>{allText.recipient.createGroupPlus}</button>
                                <span className="closeCreateGroup" onClick={closeGroupClicked}> X </span>
                                {/* <FaTimes /> */}
                            </div>
                        </div>
                        <div className="groupEmailsLine">{getContactsForGroup()}</div>
                    </div>}
                {displayContacts && showContacts()}
            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            contacts: state.init.contacts,
            user: state.init.user,
            groups: state.groups.groups,
            teams: state.conversations.teams,
            selectedSubUser: state.subUsers.selectedSubUser,
            jwt: state.init.jwt
        }
    },
    (dispatch) => ({
        addGroupServer: (val) => { dispatch(actions.addGroupServer(val)) },
        addGroup: (val) => { dispatch(actions.addGroup({ group: val })) },
        setNewContacts: (val) => dispatch(actions.setNewContacts(val))
    })

)(Recipients)
