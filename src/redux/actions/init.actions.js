import { CHECK_SOURCE_OF_USER } from "../middleware/checkSourceOfUser.crud"

export const GET_USER_SERVER = 'GET_USER_SERVER'
export const GET_USERS_EMAILS_SERVER = 'GET_USERS_EMAILS_SERVER'
export const GET_CONTACTS_SERVER = 'GET_CONTACTS_SERVER'
export const ADD_CONTACT_SERVER = 'ADD_CONTACT_SERVER'
export const GET_SOURCES_SERVER = 'GET_SOURCES_SERVER'
export const GET_WEBHOOKS_BY_USER = 'GET_WEBHOOKS_BY_USER'
export const SET_WEBHOOKS_BY_USER = 'SET_WEBHOOKS_BY_USER'

export const SET_BODY_CLICKED = 'SET_BODY_CLICKED'
export const EXTRACT_JWT = 'EXTRACT_JWT'
export const SET_NEW_CONTACT = 'SET_NEW_CONTACT'
export const SET_NEW_CONTACTS = 'SET_NEW_CONTACTS'
export const SET_USER_FROM_MOBILE = 'SET_USER_FROM_MOBILE'
export const SET_SOURCES = 'SET_SOURCES';

export function getUser() {

    return {
        type: GET_USER_SERVER
    }
}

export function getEmails() {
    return {
        type: GET_USERS_EMAILS_SERVER
    }
}

export function getContacts() {
    return {
        type: GET_CONTACTS_SERVER
    }
}

export function addContact(contact) {
    return {
        type: ADD_CONTACT_SERVER,
        payload: contact
    }
}

export function setBodyClicked(bool) {
    return {
        type: SET_BODY_CLICKED,
        payload: bool
    }
}
export function extractJwtServer(jwt) {
    return {
        type: EXTRACT_JWT,
        payload: jwt
    }
}

export function getSources() {
    return {
        type: GET_SOURCES_SERVER
    }
}

export function setNewContact(newContact) {
    return {
        type: SET_NEW_CONTACT,
        payload: newContact
    }
}
export function setNewContacts(newContacts) {
    return {
        type: SET_NEW_CONTACTS,
        payload: newContacts
    }
}
export function setUserFromMobile(bool) {
    return {
        type: SET_USER_FROM_MOBILE,
        payload: bool
    }

}

export function setSources(sources) {
    return {
        type: SET_SOURCES,
        payload: sources
    }
}

export function getWebhooksByUser() {
    return {
        type: GET_WEBHOOKS_BY_USER
    }
}

export function setWebhooksByUser(webhooks) {
    return {
        type: SET_WEBHOOKS_BY_USER,
        payload: webhooks
    }
}