import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'

// import garbage from '../signature/assets/garbage.png'
// import { ReactComponent as Garbage} from './assets/garbage.svg';
import garbage from './assets/trashGrey.svg'
import sendEmail from './assets/sendEmail.png'
import addNewContact from './assets/addNewContact.png'
import openOption from './assets/openOption.svg'
import closeIcon from '../../assets/closeCreates.svg'
import alertIcon from './assets/alert.svg'
import sendMail from './assets/sendMail.svg'
// import { updateGroup, deleteGroup } from '../../redux/actions/group.actions'
// import { addContactServer } from '../../redux/actions/lead.actions'
// import { addGroup, setContacstIdNewGroup, removeContactIdNewGroup } from '../../redux/actions/group.actions'
// import { setNewContact } from '../../redux/actions/init.actions'
import { actions } from '../../redux/actions/action'

import './myGroups.scss'
import allText from '../../allText.json'
import ContactProfile from '../contact-profile/ContactProfile'


function MyGroups(props) {
    let groupsArray = []
    groupsArray = props.groups.groups
    const [emails, setEmails] = useState([{}])
    const [showConcats, setShowConcats] = useState(null);
    const [displayAddContact, setDisplayAddContact] = useState(false)
    const [addNewGroup, setAddNewGroup] = useState(false)
    const [groupNameExists, setGroupNameExists] = useState(false)
    const [groupNameEdit, setGroupNameEdit] = useState(false)
    const [emailNameExists, setEmailNameExists] = useState([])

    const groupNameInput = React.createRef()
    const emailInput = React.createRef()

    const newGroupNameInput = React.createRef()
    const newGroupOwner = React.createRef()
    const newEmailInput = React.createRef()
    const [newEmailsArrayInput, setNewEmailsArrayInput] = useState([React.createRef(), React.createRef()]);
    const [emailName, setEmailName] = useState(false)
    // newEmailsArrayInput.push(React.createRef())
    const [countNewEmails, setCountNewEmails] = useState(1)
    const [contactIdNewEmailsArray, setContactIdNewEmailsArray] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        setEmails(props.contacts);
        if (props.groups.groups.length == 0) {
            setAddNewGroup(true)
        }
    }, [])

    useEffect(() => {
        if (props.contacts.length != 0) {
            if (emails && emails.length != 0)
                setEmails([...emails, props.contacts[props.contacts.length - 1]])
            else
                setEmails(props.contacts[props.contacts.length - 1])
        }
    }, [props.contacts])

    useEffect(() => {
        if (props.groups.currentGroup != null)
            setShowConcats(props.groups.currentGroup._id)

    }, [props.groups.currentGroup])

    const showConcatsGroup = (group) => {
        debugger
        setGroupNameExists(false)
        setGroupNameEdit(false)
        setAddNewGroup(false)
        setDisplayAddContact(false)
        if (showConcats === group._id)
            setShowConcats(null)
        else {
            setShowConcats(group._id)
            let emails = [];
            group.members.forEach(member => {
                emails.push(props.contacts.filter(c => c && c.email == member)[0]);
            });

            setEmails(emails)
        }
    }

    const newGroup = () => {
        if (props.groups.groups.length < 3 || props.user.premium) {
            setAddNewGroup(true)
            setEmails(null)
            setShowConcats(0)
            setNewEmailsArrayInput([React.createRef(), React.createRef()])
        }
        else {
            setShowAlert(true)
            // alert('You already have 3 groups or you not premium')
        }
    }

    const createGroup = (e) => {

        let name = newGroupNameInput.current.value,
            nameExists = false
        if (name) {

            props.groups.groups.forEach(g => {

                if (g.groupName.toLowerCase() === name.toLowerCase()) {
                    nameExists = true
                }
            })
            if (name.includes('@')) {
                alert("Group name can not contain @")
                newGroupNameInput.current.classList.add("invalidName")
                nameExists = true
            }


            if (nameExists) {
                newGroupNameInput.current.classList.add("invalidName")
                setGroupNameExists(true)
            }
            else {
                newGroupNameInput.current.classList.remove("invalidName")
                setGroupNameExists(false)
                let group = {
                    "groupName": name,
                }

                let members = []

                newEmailsArrayInput.forEach(async (newEmail) => {
                    if (ValidateEmail(newEmail.current.value)) {
                        newEmail.current.classList.remove("invalidEmail")
                        members.push(newEmail.current.value)
                    }
                    else {
                        newEmail.current.classList.add("invalidEmail")
                    }
                })

                if (members.length == newEmailsArrayInput.length) {
                    group.members = members
                    setAddNewGroup(false)
                    props.addGroup({ group: group })
                }
            }
        }
        else {
            newGroupNameInput.current.classList.add("invalidName")
            setGroupNameExists(true)
        }
        e.stopPropagation()
    }

    const closeNewGroup = () => {
        setAddNewGroup(false)
    }

    const delGroup = (e, name) => {
        debugger
        dispatch(actions.deleteGroupServer(name))
        if (props.groups.groups.length == 1)
            setAddNewGroup(true)
        e.stopPropagation()
    }

    const sendEmailGroup = () => {

    }

    const removeConcat = (emailMember, groupName, e) => {
        debugger
        let members = [];
        emails.forEach(e => {
            if (e && e.email !== emailMember)
                members.push(e.email)
        });
        setEmails(emails.filter(e => e && e.email !== emailMember))

        let group = {
            groupName: groupName,
            members: members,
            // newName: groupName
        }

        dispatch(actions.updateGroupServer(group))
        e.stopPropagation()
    }

    const addContact = async (groupName, e) => {
        if (ValidateEmail(emailInput.current.value)) {
            emailInput.current.classList.remove("invalidEmail")
            let members = [];
            console.log(emails)
            emails.forEach(e => {
                
                if (e)
                    if (members.filter(x => x.email !== emailInput.current.value))
                        members.push(e.email)
            });

            let member = props.contacts.filter(c => c.email === emailInput.current.value)

            if (member.length != 0) {
                members.push(member[0].email)
                let group = {
                    groupName: groupName,
                    members: members,
                    // newName: groupName
                }
                dispatch(actions.updateGroupServer(group))
                setEmails([...emails, member[0]])
            }
            else {

                let newContact = {
                    "contact": {
                        "email": emailInput.current.value
                    }
                }
                let group = {
                    groupName: groupName,
                    members: members,
                    newName: groupName
                }
                dispatch(actions.addContactServer(newContact, group))
            }

            e.stopPropagation()
            emailInput.current.value = ""
            setDisplayAddContact(false)
        }
        else {
            emailInput.current.classList.add("invalidEmail")
        }
    }

    const openAddContact = (displayAddContact) => {
        setDisplayAddContact(displayAddContact)
    }

    const ValidateEmail = (mail) => {
        console.log(mail);
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(mail) === true
    }

    const groupNameFocus = () => {
        groupNameInput.current.classList.remove("invalidName")
    }

    const checkGroupName = (groupName) => {

        let name = groupNameInput.current.value,
            nameExists = false
        if (name) {
            props.groups.groups.forEach(g => {

                if (g.groupName.toLowerCase() === name.toLowerCase() && groupName !== g.groupName) {
                    nameExists = true
                }


            })
            if (nameExists) {
                groupNameInput.current.classList.add("invalidName")
                setGroupNameExists(true)
            }
            else {
                setGroupNameExists(false)
                groupNameInput.current.classList.remove("invalidName")
            }
        }
    }
    const checkNewGroupName = (groupName) => {

        let name = newGroupNameInput.current.value
        let nameExists = false
        if (name.includes('@'))

            nameExists = true

        if (nameExists) {
            newGroupNameInput.current.classList.add("invalidName")
            setGroupNameExists(true)
        }
        else {
            setGroupNameExists(false)
            newGroupNameInput.current.classList.remove("invalidName")
        }
    }
    const GroupNameEdit = (groupId) => {
        if (showConcats == groupId)
            setGroupNameEdit(true)
    }

    const updateGroupName = (groupName, e) => {

        if (!groupNameExists) {
            let group = {
                groupName: groupName,
                newName: groupNameInput.current.value != "" ? groupNameInput.current.value : groupName
            }
            dispatch(actions.updateGroupServer(group))
        }
        setGroupNameEdit(false)
        e.stopPropagation()
    }

    const addMember = () => {
        setNewEmailsArrayInput([...newEmailsArrayInput, React.createRef()])
        console.log(newEmailsArrayInput)
    }
    const checkEmailName = (index) => {


        for (let x = 0; x < newEmailsArrayInput.length; x++) {
            let temp = emailNameExists
            if (index !== x) {
                if (newEmailsArrayInput[x].current && newEmailsArrayInput[x].current.value && newEmailsArrayInput[x].current.value === newEmailsArrayInput[index].current.value) {
                    newEmailsArrayInput[index].current.classList.add("invalidName")
                    setEmailNameExists(index)
                    setEmailName(true)
                }
                else {
                    newEmailsArrayInput[x].current.classList.remove("invalidName")
                    setEmailNameExists(-1)
                }
            }
        }
    }


    return (
        <>
            <div className="body groupsBody">
                <div className="d-flex example-parent headerGroup">
                    <div className="p-2 col-example ">
                        <div className="d-flex example-parent ">
                            <div className='p-2 col-example col-2 headerText'>
                                <h4 className="p-3  myGroupHeader"><b>{allText.group.myGroups}</b></h4>
                            </div>
                            <div className="p-2 col-example alertDiv">
                                {showAlert ?
                                    <>
                                        <img style={{ width: 20, height: 20 }} src={alertIcon} />
                                        <label className='alertClass'>you have to upgrade your plan</label>
                                    </>
                                    : ''
                                }
                            </div>
                        </div>

                    </div>
                    <div className="ml-auto p-2 col-example">
                        <button type="button" className="btn btn-light p-3 create " onClick={newGroup}> + {allText.group.newGroup}</button>
                    </div>
                </div>

                <div className=" groupList flow">
                   
                    {groupsArray.map((g) =>
                        <>
                    
                            <div className="d-flex example-parent rowGroup">
                                <div className={`p-2 col-example Icon ${showConcats == g._id ? `selectedGroup col-4` : `col-2`} `}>
                                    <img src={openOption} onClick={() => { showConcatsGroup(g) }} className="openOptionIcon" />
                                    {
                                        groupNameEdit === true && g._id === showConcats ?
                                            <input onChange={(e) => checkGroupName(g.groupName)} onBlur={(e) => updateGroupName(g.groupName, e)} className="groupInput col-5" ref={groupNameInput} placeholder="*Group name" maxLength="20" onFocus={groupNameFocus}></input>
                                            :
                                            <span className="p-3 emailContact"><b onClick={(e) => GroupNameEdit(g._id)} className="groupName">{g.groupName}</b></span>
                                    }
                                </div>
                                <div className="p-2 col-example ">
                                    <span>{g.members.length} contacts</span>
                                    {groupNameExists && showConcats == g._id && <small className="nameExistsError">{allText.group.existsName}</small>}
                                </div>

                                <div className="ml-auto p-2 col-example">
                                    <img className='Icon icon garbage' src={garbage} onClick={(e) => delGroup(e, g.groupName)} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" className=" color1 icon" viewBox="0 0 16 16" onClick={() => showConcatsGroup(g)} >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    <img className='Icon icon' src = {sendMail}  onClick={sendEmailGroup} />
                                </div>
                            </div>
                            {showConcats === g._id ?
                                (
                                    <>
                                        {g.members.map((m) =>
                                            props.contacts.filter(c => c.email === m)[0] ?
                                                <div className="d-flex example-parent  rowMemberGroup">
                                                    <div className="p-2 col-example col-4">
                                                        {/* profile */}
                                                        {/* <div style={{ backgroundColor: props.contacts.filter(c => c._id === m)[0].color || "#93389D" }} className='nameLetters nameProfilsBig' ><span >{props.contacts.filter(c => c._id === m)[0].name && conversationService.getContactLetters(props.contacts.filter(c => c._id === m)[0].name)}</span></div> */}

                                                        <p className="p-3 profilContact contacts">
                                                            <ContactProfile contact={props.contacts.filter(c => c.email === m)[0]} />
                                                            {/* <div style={{ backgroundColor: props.contacts.filter(c => c._id === m)[0].color || "#93389D" }} className='nameProfil nameProfilsBig' ><span >{props.contacts.filter(c => c._id === m)[0].name && conversationService.getContactLetters(props.contacts.filter(c => c._id === m)[0].name)}</span></div> */}
                                                            <b>{props.contacts.filter(c => c.email === m)[0].name}</b>
                                                        </p>

                                                    </div>
                                                    <div className="p-2 col-example ">
                                                        <p className="p-3 emailContact">{props.contacts.filter(c => c.email === m)[0].email}</p>
                                                    </div>
                                                    <div className="ml-auto p-2 col-example">
                                                        <button type="button" className="btn btn-light" onClick={(e) => removeConcat(m, g.groupName, e)}>Remove</button>
                                                    </div>
                                                </div>
                                                :
                                                null
                                        )}
                                        {
                                            displayAddContact ?
                                                <div className="d-flex example-parent rowMemberGroup">
                                                    <div className="p-2 col-example col-4 newMember">
                                                        {/* <p className="p-3 profilContact contacts">
                                                            <div style={{ backgroundColor: "#93389D" }} className='nameProfil nameProfilsBig' ><span >{conversationService.getContactLetters('nm')}</span></div>
                                                            <b>new member</b>
                                                        </p> */}
                                                        <p className="p-3 emailContact contacts"><b>new member</b></p>
                                                    </div>
                                                    <div className="p-2 col-example">
                                                        <input className=" groupInput" ref={emailInput} placeholder="*Email" />
                                                    </div>
                                                    <div className="ml-auto p-2 col-example">
                                                        <button type="button" className="btn btn-light buttonUpdate" onClick={(e) => addContact(g.groupName, e)}>{allText.group.addNewMember}</button>
                                                    </div>
                                                </div>
                                                : null

                                        }
                                        < div className="d-flex example-parent rowMemberGroup">
                                            <div className="p-2 col-example Icon">
                                                <p className="p-3 profilContact contacts" onClick={() => openAddContact(!displayAddContact)}>
                                                    <div style={{}} className='nameProfil nameProfilsBig' >
                                                        <img className="newContactIcon" style={{ width: 10, height: 10 }} src={addNewContact}></img>
                                                    </div>
                                                    <b>{allText.group.addNewMember}</b>
                                                </p>
                                                {/* <b className="contacts"
                                                    onClick={() => openAddContact(!displayAddContact)}
                                                > <img className="newContactIcon" style={{ width: 10, height: 10 }} src={addNewContact}></img> {allText.addNewMember}</b> */}
                                            </div>
                                            <div className="ml-auto p-2 col-example">
                                            </div>
                                        </div>
                                    </>
                                )
                                : null
                            }
                        </>
                    )}
                </div>

                {addNewGroup &&
                    <>
                        <div className="newGroupCard">
                            <div className="d-flex example-parent newGroupHeader ">
                                <div className="p-2 col-example" style={{ cursor: 'pointer' }}>
                                    <img src={closeIcon} onClick={closeNewGroup} />
                                </div>
                                <div className="ml-auto p-2 col-example">
                                    <button type="button" className="btn btn-light" onClick={createGroup} className="p-3 create "> + {allText.group.createGroup}</button>
                                </div>
                            </div>

                            <div className="d-flex example-parent rowCreateGroup">
                                <div className='p-2 col-example col-4'>
                                    <p><b>{allText.group.setGroup}</b></p>
                                </div>
                                <div className="p-2 col-example ">
                                    <p><b>{allText.group.addContacts}</b></p>
                                </div>
                            </div>

                            <div className="d-flex example-parent rowCreateGroup">
                                <div className='p-2 col-example col-4'>
                                    <div className="d-flex example-parent ">
                                        <div className='p-2 col-example col-5'>
                                            <p>{allText.group.groupName}</p>
                                        </div>
                                        <div className='p-2 col-example'>
                                            <input ref={newGroupNameInput} onBlur={() => { checkNewGroupName() }} maxLength="20" ></input>
                                            {groupNameExists && <small className="nameExistsError">Can't contain @</small>}
                                        </div>
                                    </div>

                                </div>
                                <div className="p-2 col-example ">
                                    <div className="d-flex example-parent ">
                                        <div className='p-2 col-example'>
                                            <p>{allText.group.addContact}</p>
                                        </div>
                                        <div className='p-2 col-example '>
                                            {/* <input type="text"  /> */}
                                            <input ref={newEmailsArrayInput[0]} ></input>
                                            {/* {emailNameExists=== && <small className="nameExistsError">user already exists</small>} */}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex example-parent rowCreateGroup">
                                <div className='p-2 col-example col-4'>
                                    <div className="d-flex example-parent ">
                                        <div className='p-2 col-example col-5'>
                                            <p>{allText.group.groupOwners}</p>
                                        </div>
                                        <div className='p-2 col-example'>
                                            <input ref={newGroupOwner} maxLength="20" ></input>
                                        </div>
                                    </div>

                                </div>
                                <div className="p-2 col-example ">
                                    <div className="d-flex example-parent ">
                                        <div className='p-2 col-example'>
                                            <p>{allText.group.addContact}</p>
                                        </div>
                                        <div className='p-2 col-example '>
                                            <input onBlur={() => checkEmailName(1)} ref={newEmailsArrayInput[1]} ></input>
                                            {emailNameExists === 1 && <small className="nameExistsError">user already exists</small>}

                                            {newEmailsArrayInput.length == 2 &&
                                                <img className="newContactIcon" style={{ width: 5, height: 5 }} src={addNewContact} onClick={() => addMember()}></img>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {newEmailsArrayInput && newEmailsArrayInput.length > 2 &&
                                newEmailsArrayInput.map((newMember, index) =>
                                    <>
                                        {console.log(index)}
                                        {index > 1 ?
                                            <div className="d-flex example-parent rowCreateGroup">
                                                <div className='p-2 col-example col-4'>
                                                </div>
                                                <div className="p-2 col-example ">
                                                    <div className="d-flex example-parent ">
                                                        <div className='p-2 col-example'>
                                                            <p>{allText.group.addContact}</p>
                                                        </div>
                                                        <div className='p-2 col-example '>
                                                            <input onBlur={() => checkEmailName(index)} ref={newMember} ></input>
                                                            {emailNameExists === index && <small className="nameExistsError">user already exists</small>}
                                                            {index == newEmailsArrayInput.length - 1 ?
                                                                <img className="newContactIcon" src={addNewContact} onClick={() => addMember()}></img>
                                                                : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </>
                                )

                            }

                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            groups: state.groups,
            contacts: state.init.contacts,
            newContact: state.init.newContact,
            contactsIdNewGroup: state.groups.contactsIdNewGroup,
            user: state.init.user,
        }
    },
    (dispatch) => ({
        addContactServer: (val) => { dispatch(actions.addContactServer(val)) },
        addGroup: (val) => { dispatch(actions.addGroupServer(val)) },
        setContacstIdNewGroup: (val) => { dispatch(actions.setContacstIdNewGroup(val)) },
        removeContactIdNewGroup: (val) => { dispatch(actions.removeContactIdNewGroup(val)) },
        setNewContact: (val) => { dispatch(actions.setNewContact(val)) }
    })

)(MyGroups)