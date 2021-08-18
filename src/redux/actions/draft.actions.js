export const GET_DRAFTS_SERVER = 'GET_DRAFTS_SERVER'
export const ADD_DRAFT_SERVER = 'ADD_DRAFT_SERVER'
export const DELETE_DRAFT_SERVER = 'DELETE_DRAFT_SERVER'
export const EDIT_DRAFT_SERVER = 'EDIT_DRAFT_SERVER'
export const EDIT_DRAFT = 'EDIT_DRAFT'
export const EXPAND_MESSAGE = 'EXPAND_MESSAGE'
export const MINIMIZE_MESSAGE = 'MINIMIZE_MESSAGE'


export const ADD_NEW_MESSAGE_CARD = 'ADD_NEW_MESSAGE_CARD'
export const REMOVE_NEW_MESSAGE_CARD = 'REMOVE_NEW_MESSAGE_CARD'

export function getDrafts(email, check) {
    let subUser = { email: email, check: check }
    return {
        type: GET_DRAFTS_SERVER,
        payload: subUser
    }
}

export function addDraft(draft, messageId) {

    return {
        type: ADD_DRAFT_SERVER,
        payload: { draft: draft, messageId: messageId }
    }
}

export function deleteDraft(draftID) {
    return {
        type: DELETE_DRAFT_SERVER,
        payload: draftID
    }
}

export function editDraftOnServer(draft) {
    return {
        type: EDIT_DRAFT_SERVER,
        payload: draft
    }
}
export function editDraft(draft) {
    return {
        type: EDIT_DRAFT,
        payload: draft
    }
}

export function addNewMessageCard(draft) {
    return {
        type: ADD_NEW_MESSAGE_CARD,
        payload: draft 
    }
}

export function removeNewMessageCard(id) {

    return {
        type: REMOVE_NEW_MESSAGE_CARD,
        payload: { id: id }
    }
}
export function expandMessage(bool, id, from) {

    return {
        type: EXPAND_MESSAGE,
        payload: { id: id, expand: bool, from: from }
    }
}
export function minimize(bool, id) {
    return {
        type: MINIMIZE_MESSAGE,
        payload: { id: id, minimize: bool }
    }
}



