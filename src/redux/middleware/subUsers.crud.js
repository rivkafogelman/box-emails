
import $ from "jquery";
import { GET_SUB_USERS_SERVER } from '../actions/subUsers.actions'
import checkPermission from './init.crud'
import { getConversations } from '../actions/conversation.actions'
import { getDrafts } from '../actions/draft.actions'
import { getTags } from '../actions/tag.actions'
import { getGroups } from '../actions/group.actions'
import { getAllSignaturesServer } from "../actions/signature.actions";
import { getAllTemplatesServer } from '../actions/templates.actions'
import { User } from "@leadercodes/leader-header";
import keys from '../../Config/keys';
import { getContacts } from "../actions/init.actions";
import { actions } from "../actions/action"
export const SET_SUB_USERS = 'SET_SUB_USERS'
export const NEW_SUB_USER = 'NEW_SUB_USER'
export const SUB_USER = 'SUB_USER'
export const DELETE_SUB_USER_SERVER = 'DELETE_SUB_USER_SERVER'
export const DELETE_SUB_USER = 'DELETE_SUB_USER'
export const ADD_MAIL_CHANNELS = 'ADD_MAIL_CHANNELS'
export const REMOVE_MAIL_CHANNELS = 'REMOVE_MAIL_CHANNELS'

export const newSubUser = ({ dispatch, getState }) => next => action => {
    if (action.type === NEW_SUB_USER) {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/subUsers/newSubUser",
            type: "POST",
            headers: { Authentication: getState().init.jwt },
            data: action.payload,
            success: function (data) {
                if (data === 'You already have 3 subusers') { alert(data) }
                else {
                    console.log("data.subUsers from middleware", data);
                    dispatch({ type: SUB_USER, payload: data.newUser })
                }
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}
export const addMailChannels = ({ dispatch, getState }) => next => action => {
    // let name={"name":action.payload}
    if (action.type === ADD_MAIL_CHANNELS) {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/subUsers/addMailChannels",
            type: "POST",
            headers: { Authentication: getState().init.jwt },
            data: { users: action.payload },
            success: function (data) {
                console.log("data.subUsers from middleware", data);
                dispatch(actions.setMailChannels(data.Manager.mailChannels))
                dispatch(actions.getConversationsServer())
                dispatch(actions.getTagsServer())
                dispatch(actions.getDraftsServer())
                dispatch(actions.getGroupsServer())
                dispatch(actions.getContactsServer())
                dispatch(actions.getAllSignaturesServer())
                dispatch(actions.getAllTemplatesServer())
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}
export const removeMailChannels = ({ dispatch, getState }) => next => action => {

    if (action.type === REMOVE_MAIL_CHANNELS) {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/subUsers/removeMailChannels",
            type: "POST",
            headers: { Authentication: getState().init.jwt },
            data: { users: action.payload },
            success: function (data) {
                console.log("data.subUsers from middleware", data);
                dispatch(actions.setMailChannels(data.Manager.mailChannels))
                dispatch(actions.getConversationsServer())
                dispatch(actions.getTagsServer())
                dispatch(actions.getDraftsServer())
                dispatch(actions.getGroupsServer())
                dispatch(actions.getContactsServer())
                dispatch(actions.getAllSignaturesServer())
                dispatch(actions.getAllTemplatesServer())


            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}
export const getSubUsersMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === GET_SUB_USERS_SERVER) {
        $.ajax({
            url: keys.API_URL + "getUsersByManager/" + getState().init.userName,
            type: 'GET',
            headers: { Authentication: getState().init.jwt },
            // success: function (data) {
            //     console.log("data.userEmails from middleware", data);
            //     data.managerWithUsers.push(getState().init.user)
            //     dispatch({ type: SET_SUB_USERS, payload: data.managerWithUsers })

            // },
            success: function (data) {
                //  
                console.log("data.userEmails from middleware", data);
                let managerWithUsers = data.managerWithUsers
                let contact = {
                    "email": getState().init.userName + '@mails.codes',
                    "username": getState().init.userName,
                    "userType": "manager"
                }
                let tempU
                if (managerWithUsers.length !== 0) {
                    tempU = managerWithUsers[0]
                    managerWithUsers[0] = contact
                    managerWithUsers.push(tempU)
                }

                dispatch({ type: SET_SUB_USERS, payload: managerWithUsers })

            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}
export const deleteSubUserMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_SUB_USER_SERVER') {
        $.ajax({
            url: keys.API_URL + action.payload + "/subUsers/deleteSubUser/",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            // data: action.payload,
            success: function (data) {
                dispatch({ type: 'DELETE_SUB_USER', payload: action.payload })
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}

