// import { UPLOAD_PHOTO } from "../middleware/subUsers.crud"

export const GET_SETTINGS = 'GET_SETTINGS'
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const CHANGE_TEXT_COLOR_SERVER = 'CHANGE_TEXT_COLOR_SERVER'
export const DELETE_BACKGROUND_PHOTO_SERVER = 'DELETE_BACKGROUND_PHOTO_SERVER'
export const SET_BG_EMAIL = 'SET_BG_EMAIL'

export function getSettings () {
    return {
        type: GET_SETTINGS
    }
}

export function changeTextColor (colorText) {
    return {
        type: CHANGE_TEXT_COLOR_SERVER,
        payload: colorText
    }
}

export function uploadPhoto(file) {
    return {
        type: UPLOAD_PHOTO,
        payload: file
    }
}

export function deleteBGPhoto(bgName) {
    return {
        type: DELETE_BACKGROUND_PHOTO_SERVER,
        payload: bgName
    }
}

export function setBackGroundEmail(bgName) {
    return {
        type: SET_BG_EMAIL,
        payload: bgName
    }
}