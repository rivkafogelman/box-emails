import { connect } from "react-redux"
import React, { useState, useEffect, useRef } from 'react'
import '../recipients/Recipients.scss'
import $ from 'jquery'
// import Tooltip from '@material-ui/core/Tooltip';
// import { deleteGroup, addGroup } from '../../redux/actions/group.actions'
// all text
import allText from '../../allText.json'
// import plusMiniGrey from '../new-message/assets/plusMiniGrey.svg'
import { FaTimes, FaRegBell } from 'react-icons/fa'
import profileImg from '../../assets/Component 157 – 6.svg'
import conversationService from '../../services/conversation.service'

// import profileImg from '../../assets/Component 157 – 6.svg'
// import groupCircle from './assets/groupCircle.svg'
// import ContactProfile from '../contact-profile/ContactProfile'

function ContactForSearch(props) {
    const [displayContacts, setDisplayContacts] = useState(false)
    const [contactsList, setContactsList] = useState([])
    const [displayPush, setDisplayPush] = useState(false)

    const newMessageToP = useRef(null),
        newMessageTo = useRef(null)
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
        setDisplayContacts(contactsList.length !== 0)
        newMessageToP && newMessageToP.current && newMessageToP.current.focus()
    }, [newMessageToP.current, contactsList])

    useEffect(() => {
        setContactsList([])
        if (newMessageToP.current) {
            newMessageToP.current.innerHTML = ""
        }
    }, [props.recipients])

    const newMessageBlur = (e) => {
        if (!e.relatedTarget || e.relatedTarget && e.relatedTarget.id !== "contactsForMessageCard")
            emailKeyUp(e, "to")
        setCursor(0);
    }

    const ValidateEmail = (mail) => {
        console.log(mail);
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(mail) === true
    }

    const searchContact = async (text, type) => {
        setContactsList([])
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
            if (cursor > contactsList.length) {
                setCursor(0)
            }
        }
    }

    const emailKeyUp = (e, type) => {
        if (e.key === "Enter" || e.type === "blur") {
            let recipientObj
            //add email - not contact - to recipients
            if (!displayContacts) {
                if (newMessageToP.current.textContent === "") {
                    newMessageToP.current.innerHTML = ""
                }
                else {
                    let valid = ValidateEmail(newMessageToP.current.textContent)
                    recipientObj = { "type": "email", "email": newMessageToP.current.textContent, "valid": valid }
                    props.setRecipients(oldArray => [...oldArray, recipientObj])
                }
            }
            //add contact to recipients
            else {
                recipientObj = { "type": "contact", "email": contactsList[cursor].email, "contactName": contactsList[cursor].name, "contactId": contactsList[cursor]._id }
                props.setRecipients(oldArray => [...oldArray, recipientObj])
                setCursor(0);
            }
        }
        else {
            if (e.key === "ArrowDown" && e.target.innerText === "") {
                setContactsList([...props.contacts]);
            }
            else if (e.key !== "ArrowUp") { searchContact(e.target.innerText) }
        }
        e.stopPropagation()
    }
    const handleKeyDown = (e) => {
        // arrow up/down button should select next/previous list element     
        let length = contactsList.length
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
    // const showContacts = () => {
    //     return (<>{displayContacts &&
    //         <div tabIndex={0} id="contactsForMessageCard" className={`card contactsForMessageCard `} onBlur={() => {
    //             setDisplayContacts(false)
    //         }}>
    //             {contactsList.map((contact, index) =>
    //                 <div className={`contactNameAndEmail d-flex ${cursor === index ? "activeContactNameAndEmail" : ""}`} onClick={(e) => {
    //                     let recipientObj = { type: "contact", contactName: contact.name, email: contact.email, contactId: contact._id }
    //                     setCursor(0);
    //                     props.setRecipients(oldArray => [...oldArray, recipientObj])
    //                     newMessageToP.current.focus()
    //                     e.stopPropagation()
    //                 }}>
    //                     <ContactProfile contact={contact} />
    //                     <div className="profile">
    //                         <div className="contactName">{contact.name}</div>
    //                         <div className="contactEmail">{contact.email}</div>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     }</>)
    // }
    const showContacts = () => {
        return (<>{displayContacts &&
            <div tabIndex={0} id="contactsForMessageCard" className={`card ${props.fromSearch && 'contactsForMessageCardinSearch'} contactsForMessageCard type `} onBlur={() => {
                setDisplayContacts(false)
            }}>
                {contactsList.map(contact =>
                    <div className="contactNameAndEmail d-flex" onClick={(e) => {
                        let recipientObj = { type: "contact", contactName: contact.name, email: contact.email, contactId: contact._id }
                        props.setRecipients(oldArray => [...oldArray, recipientObj])
                        newMessageToP.current.focus()
                        e.stopPropagation()
                    }}>
                        <div className="profile">
                            {contact && contact.thumbnail && <img src={contact.thumbnail} className="contactImg"></img>
                                || contact.name && contact.color && <div className="nameLetters" style={{ backgroundColor: contact.color }}><span>{conversationService.getContactLetters(contact.name)}</span></div> ||
                                <img src={profileImg} className="contactImg"></img>
                            }
                        </div>
                        <div className="profile">
                            <div className="contactName">{contact.name}</div>
                            <div className="contactEmail">{contact.email}</div>
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

    const getRecipients = () => {
        console.log("in getRecipients")
        let recipientsList = []
        props.recipients.map((recipient) => {
            switch (recipient.type) {
                case "email":
                    recipientsList.push(
                        <span contentEditable="false" className={`messageEmail ${recipient.valid ? `  correctEmail` : ` incorrectEmail`}`}>{recipient.email}
                            <span onClick={(e) => { ; props.setRecipients(props.recipients.filter((item) => (item !== recipient))); e.stopPropagation() }}><FaTimes />
                            </span>
                        </span>
                    )
                    break;
                case "contact":
                    recipientsList.push(
                        <span contentEditable="false" className={`messageEmail correctEmail`}>{recipient.contactName}
                            <span onClick={(e) => { ; props.setRecipients(props.recipients.filter((item) => (item !== recipient))); e.stopPropagation() }}><FaTimes />
                            </span>
                        </span>
                    )
                    break;
                default:
                    break;
            }
        })
        console.log("getRecipients", recipientsList)
        return (
            recipientsList.map(r => r)
        )
    }

    return (
        <>
            <div>
                <div tabIndex="0" onBlur={newMessageBlur} className="newMessageTo" ref={newMessageTo} onFocus={() => newMessageToP.current.focus()} >
                    <div className="warpTo">
                        <span className="toSpan">{`${allText.contact.to}: `}</span>
                        {props.recipients ? getRecipients() : ``}
                        <p tabIndex="-1" contentEditable={true} id="newMessageToP" ref={newMessageToP} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => emailKeyUp(e, "to")} onFocus={() => { if (contactsList.length > 0) setDisplayContacts(true) }}></p>
                    </div>
                </div>
                {displayContacts && showContacts()}
            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            contacts: state.init.contacts,
        }
    }, {
})(ContactForSearch)
