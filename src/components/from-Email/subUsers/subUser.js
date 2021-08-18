import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getSubUsers } from '../../../redux/actions/subUsers.actions'
// import { setSelectedSignatureId } from '../../redux/actions/signature.actions';
// import { setSelectedSubUsers, addMailChannels, removeMailChannels, getuserType } from '../../../redux/actions/subUsers.actions'
import { getConversations, setConversation } from '../../../redux/actions/conversation.actions'
import { getDrafts } from '../../../redux/actions/draft.actions'
import { getTags } from '../../../redux/actions/tag.actions'
import { getGroups } from '../../../redux/actions/group.actions'
import { getContacts } from "../../../redux/actions/init.actions";
import { getAllSignaturesServer } from "../../../redux/actions/signature.actions";
import { getAllTemplatesServer } from '../../../redux/actions/templates.actions'
import { Checkbox } from '@material-ui/core';
import Users from '../../UsersManager/Users';
import { actions } from '../../../redux/actions/action';
import { getAllByText } from '@testing-library/react';
import allText from '../../../allText.json'

import './subUser.scss'

function SubUsers(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(props.user.mailChannels)
    const [createNewSignature, setCreateNewSignature] = useState(false);
    const [displaySub, setDisplaySub] = useState(false)
    //const [checked, setChecked] = useState(false)
    const [over, setOver] = useState(false)
    const [selectAllSubUsers, setSelectAllSubUsers] = useState(false)
    const [createNewSubUser, setCreateNewSubUser] = useState(false)

    const subUserInput = React.createRef()

    const userName = useSelector(state => state.init.userName);

    useEffect(() => {
        props.getSubUsersServer()
    }, [])

    useEffect(() => {
        console.log("mailChannels", props.mailChannels);
    }, [props.mailChannels])
    const MouseOver = (e) => {
        const element = document.getElementById(e.target.attributes.id.value)
        element.style.backgroundColor = "#F0F8FF"
    }

    const MouseOut = (e) => {
        const element = document.getElementById(e.target.attributes.id.value)
        element.style.backgroundColor = ""
    }

    const changeSelectSubUsers = () => {
        let users = []
        if (selectAllSubUsers == false) {
            props.subUsers.forEach(subUser => {
                if (subUser.userType !== "manager") {
                    let subuser = props.mailChannels.filter(m => m == subUser.username)
                    if (subuser.length == 0)
                        users.push(subUser.username)
                }
            });
            props.addMailChannels(users)

        }

        else {
            props.subUsers.forEach(subUser => {
                if (subUser.userType !== "manager") {
                    let subuser = props.mailChannels.filter(m => m == subUser.username)
                    if (subuser.length != 0)
                        users.push(subUser.username)
                }

            });
            props.removeMailChannels(users)

        }
        setSelectAllSubUsers(!selectAllSubUsers)
    }


    const createSubUser = () => {

        if (props.subUsers.length < 4 || props.user.premium) {
            if (subUserInput.current.value != "") {
                let user = {
                    email: subUserInput.current.value + "." + userName + allText.usersManager.mailsCodes
                }
                let subUser = props.subUsers.filter(su => su.email == user.email)
                if (subUser.length == 0) {
                    subUserInput.current.classList.remove("invalidEmail")
                    props.addSubUser(user)
                    props.addMailChannels(subUserInput.current.value + "." + userName)
                    setCreateNewSubUser(false)
                    subUserInput.current.value = ""
                }
                else
                subUserInput.current.classList.add("invalidEmail")
            }
        }
    }

    return (
        <div className="sorcesList">
            <div className={`d-flex align-items-center oneSubUserDiv ${createNewSubUser === true && `newSubUserSelected`}`}
                onClick={
                    (e) => {
                        setCreateNewSubUser(true)
                        e.stopPropagation()
                    }}>{allText.subUser.newSubUser}
            </div>

            {createNewSubUser == true &&
                <input type="text" className="subUserInput" ref={subUserInput} maxLength="20" placeholder={allText.subUser.addSubUser} onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        if (e.target.value !== "") {
                            createSubUser()
                        }
                    }
                }} />
            }


            {
                // props. selectedSubUser === props.userName &&
                <div>
                    <input className="form-check-input me-1" type="checkbox" aria-label="..."
                        style={{ position: 'unset' }}
                        onChange={(e) => {
                            changeSelectSubUsers()

                        }}
                    />
                    <span >{allText.subUser.selectAll}</span>
                    {props.subUsers && props.subUsers.map(s =>
                        <div className={`source ${props.subUsers && s.username === props.subUsers.selectedSubUser && `selected`}`}>
                            {/* {props. selectedSubUser === props.userName &&
                    <div> */}
                            {s.userType === "manager" ?
                                <input className="form-check-input me-1" type="checkbox" aria-label="..."
                                    checked={true} style={{ position: 'unset' }} />
                                :

                                //user.includes(s.username) || s.userType === "manager" 
                                <input className="form-check-input me-1" type="checkbox" aria-label="..."
                                    checked={props.mailChannels.includes(s.username)}
                                    style={{ position: 'unset' }}
                                    onChange={(e) => {

                                        if (e.target.checked === true && s.username !== props.userName) {

                                            props.addMailChannels([s.username])
                                        }
                                        else {
                                            props.removeMailChannels([s.username])

                                        }
                                    }} />
                            }

                            <span
                                // id={Math.random()}
                                // className={`over${over===true&& ` selected` }`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    // setChecked(true)

                                    props.setSelectedSubUser(s.username);
                                    props.getConversationsServer();
                                    props.getAllSignaturesServer();
                                    props.getContactsServer()
                                    props.getGroupsServer()
                                    props.getDraftsServer()
                                    props.getTagsServer();
                                    props.getAllTemplatesServer();
                                    // props.getuserType(s.userType)

                                }}
                            >
                                {s.username}
                            </span>
                        </div>
                    )
                    }
                </div>
            }
            <span style={{ cursor: 'pointer' }}
                onClick={() => {
                    props.setSelectedSubUser(props.userName)
                }}>{props.userName}</span>
        </div >
    )
}

export default connect(
    (state) => {
        return {
            subUsers: state.subUsers.subUsers,
            userName: state.init.username,
            user: state.init.user,
            signatures: state.signature.signaturesList,
            selectedSubUser: state.subUsers.selectedSubUser,
            type: state.subUsers.type,
            allConversations: state.conversations.allConversations,
            mailChannels: state.subUsers.mailChannels

            // flagsList: state.conversations.flagsList,
        }
    },
    (dispatch) => ({
        getSubUsersServer: (val) => { dispatch(actions.getSubUsersServer(val)) },
        setSelectedSubUser: (val) => { dispatch(actions.setSelectedSubUser(val)) },
        getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val)) },
        addMailChannels: (val) => { dispatch(actions.addMailChannels(val)) },
        removeMailChannels: (val) => { dispatch(actions.removeMailChannels(val)) },
        setConversation: (val) => { dispatch(actions.setConversation(val)) },
        setUserType: (val) => { dispatch(actions.setUserType(val)) },
        getDraftsServer: (val) => { dispatch(actions.getDraftsServer(val)) },
        getTagsServer: (val) => { dispatch(actions.getTagsServer(val)) },
        getGroupsServer: (val) => { dispatch(actions.getGroupsServer(val)) },
        getAllSignaturesServer: (val) => { dispatch(actions.getAllSignaturesServer(val)) },
        getAllTemplatesServer: (val) => { dispatch(actions.getAllTemplatesServer(val)) },
        getContactsServer: (val) => { dispatch(actions.getContactsServer(val)) },
        addSubUser: (val) => { dispatch(actions.newSubUser(val)) },
        addMailChannels: (val) => { dispatch(actions.addMailChannels(val)) },


    })
)(SubUsers)