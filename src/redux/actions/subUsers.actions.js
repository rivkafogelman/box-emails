
import { SET_SUB_USERS, } from "../middleware/subUsers.crud"

export const GET_SUB_USERS_SERVER = 'GET_SUB_USERS_SERVER'
export const NEW_SUB_USER = 'NEW_SUB_USER'
export const DELETE_SUB_USER_SERVER = 'DELETE_SUB_USER_SERVER'
export const SET_SELECTED_SUB_USER = 'SET_SELECTED_SUB_USER'
export const ADD_MAIL_CHANNELS = 'ADD_MAIL_CHANNELS'
export const REMOVE_MAIL_CHANNELS = 'REMOVE_MAIL_CHANNELS'
export const SET_USER_TYPE = 'SET_USER_TYPE'
export const SET_MAIL_CHANELLS = 'SET_MAIL_CHANELLS'

export function getSubUsers() {
    return {
        type: GET_SUB_USERS_SERVER,

    }

}

export function addSubUser(subUsers) {
    return {
        type: NEW_SUB_USER,
        payload: subUsers

    }
}
export function addMailChannels(user) {
//  
    return {
        type: ADD_MAIL_CHANNELS,
        payload: user

    }
}
export function removeMailChannels(user) {

    return {
        type: REMOVE_MAIL_CHANNELS,
        payload: user

    }
}
export function setSelectedSubUser(email) {
    return {
        type: SET_SELECTED_SUB_USER,
        payload: email
    }

}
export function getuserType(type) {
    return {
        type: SET_USER_TYPE,
        payload: type
    }
}
export function deleteSubUser(subUser) {

    return {
        type: DELETE_SUB_USER_SERVER,
        payload: subUser
    }
}
export function setMailChannels(channels) {
    return {
        type: SET_MAIL_CHANELLS,
        payload: channels

    }
}