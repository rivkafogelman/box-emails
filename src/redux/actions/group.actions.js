export const GET_GROUPS_SERVER = 'GET_GROUPS_SERVER'
export const ADD_GROUP_SERVER = 'ADD_GROUP_SERVER'
export const DELETE_GROUP_SERVER = 'DELETE_GROUP_SERVER'
export const UPDATE_GROUP_SERVER = 'UPDATE_GROUP_SERVER'
export const SET_CURRENT_GROUP = 'SET_CURRENT_GROUP'
export const SET_CONTACT_ID_NEW_GROUP = 'SET_CONTACT_ID_NEW_GROUP'
export const REMOVE_CONTACT_ID_NEW_GROUP = 'REMOVE_CONTACT_ID_NEW_GROUP'

export const SET_SHOW = 'SET_SHOW'
export function getGroups(email, check) {
    let subUser = { email: email, check: check }
    return {
        type: GET_GROUPS_SERVER,
        payload: subUser
    }
}

export function addGroup(group) {
    return {
        type: ADD_GROUP_SERVER,
        payload: { "group": group }
    }
}

export function updateGroup(group) {
    return {
        type: UPDATE_GROUP_SERVER,
        payload: { "group": group }
    }
}
export function deleteGroup(name) {

    return {
        type: DELETE_GROUP_SERVER,
        payload: { "groupName": name }
    }

}

export function setShow(bool) {
    return {
        type: SET_SHOW,
        payload: bool
    }
}

export function setCurrentGroup(group) {
    return {
        type: SET_CURRENT_GROUP,
        payload: group
    }
}

export function setContacstIdNewGroup(contactId) {
    return {
        type: SET_CONTACT_ID_NEW_GROUP,
        payload: contactId
    }
}

export function removeContactIdNewGroup(contactId) {
    return {
        type: REMOVE_CONTACT_ID_NEW_GROUP,
        payload: contactId
    }
}