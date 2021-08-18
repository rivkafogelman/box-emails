export const SEND_GMAIL_SERVER = 'SEND_GMAIL_SERVER'
export const SAVE_GOOGLE_TOKEN = 'SAVE_GOOGLE_TOKEN'
export const GET_LABELS_GMAIL_SERVER = 'GET_LABELS_GMAIL_SERVER'
export const GET_MESSAGES_GMAIL_SERVER = 'GET_MESSAGES_GMAIL_SERVER'
export const ADD_GMAIL_TAG_SERVER = 'ADD_GMAIL_TAG_SERVER'
export const GET_GMAIL_ADDRESS_SERVER = 'GET_GMAIL_ADDRESS_SERVER'
export const SEND_GMAIL = 'SEND_GMAIL'
export const GET_IF_GMAIL_LABELS_SERVER='GET_IF_GMAIL_LABELS_SERVER'
export const CHANGE_HNABLE_GOOGLE_TOKEN='CHANGE_HNABLE_GOOGLE_TOKEN'
export function addGmailTag(tag) {

    return {
        type: ADD_GMAIL_TAG_SERVER,
        payload: tag
    }
}
export function saveGoogleToken(bool) {
    return {
        type: SAVE_GOOGLE_TOKEN,
        payload: bool
    }
}
export function sendGmailServer() {
    return {
        type: SEND_GMAIL_SERVER
    }
}
export function getLabelsGmailServer() {
    return {
        type: GET_LABELS_GMAIL_SERVER
    }
}
export function getMesagesGmailServer(gmail) 
{
    return {
        type: GET_MESSAGES_GMAIL_SERVER,
        payload: gmail

    }
}
export function getGmailAddressServer() {
    return {
        type: GET_GMAIL_ADDRESS_SERVER
    }
}
export function sendGmail(gmail) {
    return {
        type: SEND_GMAIL,
        payload: gmail
    }
}
export function ifGmailLabels(name) {
    return {
        type: GET_IF_GMAIL_LABELS_SERVER,
        payload: name
    }
}

export function changeEnableGoogleToken() {
    return {
        type: CHANGE_HNABLE_GOOGLE_TOKEN
    }
}
