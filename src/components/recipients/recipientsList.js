import { connect } from "react-redux"
import React, { useState, useEffect, useRef } from 'react'
import './Recipients.scss'
import $ from 'jquery'
import ContactProfile from '../contact-profile/ContactProfile'

function Recipients(props) {
   const [displayContacts, setDisplayContacts] = useState(false)
    const [teamsList, setTeamsList] = useState([])
    const [contactsList, setContactsList] = useState([])
    const [displayPush, setDisplayPush] = useState(false)
    const newMessageToP = useRef(null),
        newMessageTo = useRef(null)
    const [currentTypeTo, setCurrentTypeTo] = useState('')
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
        setDisplayContacts(contactsList.length !== 0 )
        newMessageToP && newMessageToP.current && newMessageToP.current.focus()
    }, [newMessageToP.current, contactsList])

    useEffect(() => {
        setContactsList([])
        if (newMessageToP.current) {
            newMessageToP.current.innerHTML = ""
        }
        setDisplayContacts(false)
        setDisplayPush(false)
      
    }, [props.recipients, props.isNotification])

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
          
            if (cursor > contactsList.length ) {
                setCursor(0)
            }
        }
    }

    const emailKeyUp = (e, type) => {
        if (props.isNotification !== null && e.target.textContent === "push:") {
            props.setIsNotification(true)
            props.setRecipients([])
            return
        }
        let recipientObj
        setCurrentTypeTo(type)
        if (e.key === "Enter" || e.type === "blur") {
            let recipientObj

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
            else if (cursor < contactsList.length && contactsList.length !== 0) {
                recipientObj = { "type": "contact", "email": contactsList[cursor].email, "contactName": contactsList[cursor].name, "contactId": contactsList[cursor]._id }
                props.setRecipients(oldArray => [...oldArray, recipientObj])
                setCursor(0);
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
                //insert not-contact email
               if (newMessageToP.current.textContent) {
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
                
            }
            else if (e.key !== "ArrowUp") { searchContact(e.target.innerText) }
        }
        e.stopPropagation()
    }
    const handleKeyDown = (e) => {
        // arrow up/down button should select next/previous list element     
        let length = contactsList.length;
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
            <div tabIndex={0} id="contactsForMessageCard" className={`card contactsForMessageCard type${currentTypeTo} `} onBlur={() => {
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
                
                
            </div>
        }</>)
    }

    return (
        <>
            <div>
                    <>
                        <div tabIndex="0" onBlur={newMessageBlur} className="newMessageTo" ref={newMessageTo} >
                            <div>
                                <p tabIndex="-1" contentEditable="true" id="newMessageToP" ref={newMessageToP} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => emailKeyUp(e, "to")} onFocus={() => { if (contactsList.length > 0) setDisplayContacts(true) }}></p>
                            </div>
                        </div>
                    </>
                   
                {displayContacts && showContacts()}
            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            contacts: state.init.contacts
        }
    })(Recipients)