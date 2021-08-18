import React, { useState, useEffect } from 'react'
// import { addGroup, setShow } from '../../redux/actions/group.actions'
import { Modal, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { connect } from "react-redux"
import defaultAvatar from '../../assets/default-avatar.png'
import { FaTimes, FaPlusCircle } from 'react-icons/fa'
import './NewGroup.scss'
import Tooltip from '@material-ui/core/Tooltip';
import {actions} from '../../redux/actions/action'

function NewGroup(props) {
    const [displayContactsForGroup, setDisplayContactsForGroup] = useState(false);
    const [contactsListForGroup, setContactsListForGroup] = useState([])
    const [groupEmails, setGroupEmails] = useState([])

    const newGroupTo = React.createRef(),
        newGroupToP = React.createRef(),
        groupNameInpt = React.createRef()

    useEffect(() => {
        setGroupEmails([])
    }, [props.showModal])

    useEffect(() => {
        setDisplayContactsForGroup(contactsListForGroup.length !== 0)
    }, [contactsListForGroup])

    const getGroupEmails = () => {
        return (
            <>{
                groupEmails.map(e =>
                (
                    <span contentEditable="false" className={`messageEmail
                    ${(e.contactName != "" || ValidateEmail(e.email)) ? `correctEmail` : `incorrectEmail`}`}
                        email={e.email} >{e.contactName != "" ? e.contactName : e.email} <span onClick={(event) => (removeEmailForGroup(event, e))}><FaTimes /></span></span>
                )
                )}</>
        )
    }

    const removeEmailForGroup = (event, email) => {
        setGroupEmails(groupEmails.filter((item) => (item != email)));
        event.stopPropagation()
    }

    const insertEmailForGroup = (eml) => {
        let email = eml, contactName = ""
        if (eml) {
            //for contact or group
            props.contacts.forEach(c => {
                if (c.name === eml) {
                    email = c.email
                    contactName = c.name
                }
            });
            // if the contact not exists- the mail is the function parameter
            let emailObj = { "contactName": contactName, "email": email }
            setGroupEmails(oldArray => [...oldArray, emailObj])
        }

        newGroupToP.current.innerHTML = ""
        newGroupToP.current.focus()
        setContactsListForGroup([])
    }
    const ValidateEmail = (mail) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(mail) === true
    }

    const searchContactForGroup = async (text) => {
        setContactsListForGroup([])
        if (text != "") {
            await props.contacts.forEach(async (contact) => {
                if (contact.email.substring(0, contact.email.indexOf("@")).indexOf(text.toLowerCase()) > -1 ||
                    contact.name != undefined && contact.name.indexOf(text.toLowerCase()) > -1) {
                    await setContactsListForGroup(oldArray => [...oldArray, contact]);
                }
            })
        }
        console.log("ContactslistForGroup", contactsListForGroup)
    }

    const emailForGroupKeyUp = (e) => {
        searchContactForGroup(e.target.innerText)
        e.stopPropagation()
    }

    const showContactsForGroup = () => {
        return (<>
            <div tabIndex={0} className={"card contactsForGroupCard"} onBlur={() => {
                setDisplayContactsForGroup(false)
            }}>
                {contactsListForGroup.map(contact =>
                (<div className="contactNameAndEmail row" onClick={(e) => {
                    insertEmailForGroup(contact.name)
                    setDisplayContactsForGroup(false)
                    e.stopPropagation()
                }}>
                    <div className="col-2">
                        <img src={defaultAvatar} className="contactImg"></img>
                    </div>
                    <div className="col-9">
                        <div className="contactName">{contact.name}</div>
                        <div className="contactEmail">{contact.email}</div>
                    </div>
                </div>)
                )}
            </div>
        </>)
    }
    const createGroup = (e) => {

        e.stopPropagation()
        let name = groupNameInpt.current.value,
            nameExists = false
      
        if (name) {

            props.groups.forEach(g => {
                if (g.groupName.toLowerCase() === name.toLowerCase()) {
                    nameExists = true
                }
            })
            if (nameExists) {
                groupNameInpt.current.style.color = "red"
            }
            else if (props.emails.length !== 0) {
                groupNameInpt.current.style.color = ""
                let contactsForGroup = []
                let contact = ""
                props.emails.forEach(e => {
                    contact = props.contacts.find(c => c.email === e.email)
                    if (contact) {
                        contactsForGroup.push(contact._id)
                    }
                });
                if (contactsForGroup) {
                    let group = {
                        "groupName": name,
                        "members": contactsForGroup
                    }
                    props.addGroup(group)
                    props.setShow(false)
                }
                else {
                    alert("You mast add only contacts")
                }
            }

        }
        else {
            groupNameInpt.current.style.borderColor = "red"
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">New group</Popover.Title>
            <Popover.Content>
                {/* <div>
                    {groupEmails && getGroupEmails()}
                </div> */}
                <div>
                    <input type="text" className="groupName" ref={groupNameInpt} placeholder="Group name" maxLength={20}></input>
                </div>
                <div className="crGrButtons">
                    <Button variant="secondary" className="closeBtn" onClick={(e) => {
                        props.setShow(false);
                        e.stopPropagation()
                    }}>
                        Close</Button>
                    <Button variant="primary" className="saveBtn" onClick={createGroup}>
                        Create</Button>
                </div>

            </Popover.Content>
        </Popover >
    );

    return (
        <OverlayTrigger show={props.showModal} placement="left" overlay={popover} >
            <Tooltip title="Create group">
                <span className="createGroupIcon" onClick={() => props.setShow(!props.showModal)}><FaPlusCircle /></span>
            </Tooltip>
        </OverlayTrigger >

    )
}


export default connect(
    (state) => {
        return {
            contacts: state.init.contacts,
            usersEmails: state.init.usersEmails,
            showModal: state.groups.show,
            groups: state.groups.groups
        }
    },
       
    (dispatch) => ({
        addGroup: (val) => { dispatch(actions.addGroup(val))},
        setShow: (val) => { dispatch(actions.setShow(val))},
    })
)(NewGroup)