export const GET_ALL_SIGNATURES_SERVER = 'GET_ALL_SIGNATURES_SERVER'
export const ADD_SIGNATURE_SERVER = 'ADD_SIGNATURE_SERVER'
export const REMOVE_SIGNATURE_SERVER = 'REMOVE_SIGNATURE_SERVER'
export const EDIT_SIGNATURE_SERVER = 'EDIT_SIGNATURE_SERVER'
export const UPLOAD_PHOTO_SIGNATURE_SERVER = 'UPLOAD_PHOTO_SIGNATURE_SERVER'
export const UPLOAD_BANNER_PHOTO_SERVER = '[signature]UPLOAD_BANNER_PHOTO_SERVER'
export const SET_SELECTED_SIGNATURE_ID = 'SET_SELECTED_SIGNATURE_ID'
// export const SET_DISPLAY_FIELD = '[signature]SET_DISPLAY_FIELD'
export const EDIT_SIGNATURE = "EDIT_SIGNATURE"

export const SET_SELECTED_COLOR = '[signature]SET_SELECTED_COLOR'
// export const CHANGE_COLOR = '[signature]CHANGE_COLOR'

export function getAllSignaturesServer() {
    return {
        type: GET_ALL_SIGNATURES_SERVER,
  
    }
}

export function addSignatureServer(signature) {
    return {
        type: ADD_SIGNATURE_SERVER,
        payload: signature
    }
}

export function removeSignature(id) {
    return {
        type: REMOVE_SIGNATURE_SERVER,
        payload: id
    }
}

const changeDisplayForEmptyUrl = (signature) => {

    if (!signature.twitter_icon.url) {
        signature.twitter_icon.display = false
    }
    if (!signature.youtube_icon.url) {
    }
    if (!signature.facebook_icon.url) {
    }
    if (!signature.linkedin_icon.url) {
    }
    if (!signature.whatsapp_icon.url) {
    }
    if (!signature.instagram_icon.url) {
    }
    return signature
}

export function editSignatureServer(signature) {
    // // var a = { ...signature }
    //var temp = Object.assign({}, signature)
    //let result = changeDisplayForEmptyUrl(temp)
    return {
        type: EDIT_SIGNATURE_SERVER,
        payload: signature,
    }
}

// export function setDisplayField(display, field) {
//     return {
//         type: SET_DISPLAY_FIELD,
//         payload: display,
//         field: field
//     }
// }

export function uploadPhotoSignatureServer(file) {
    return {
        type: UPLOAD_PHOTO_SIGNATURE_SERVER,
        payload: file
    }
}

export function uploadBannerPhotoSignatureServer(file) {
    return {
        type: UPLOAD_BANNER_PHOTO_SERVER,
        payload: file
    }
}

export function setSelectedColorSignature(color) {
    return {
        type: SET_SELECTED_COLOR,
        payload: color
    }
}

export function setSelectedSignatureId(id) {
    return {
        type: SET_SELECTED_SIGNATURE_ID,
        payload: id
    }
}


export function editSignature(fieldValue, fieldName, fieldNameInObj) {
     
    return {
        type: EDIT_SIGNATURE,
        payload: { fieldValue, fieldName, fieldNameInObj }
    }
}
// export function changeColor(changeFor, color) {
//     return {
//         type: CHANGE_COLOR,
//         payload: { changeFor: changeFor, color: color }
//     }
// }

// export function addSignature(sig) {
//     return {
//         type: ADD_SIGNATURE,
//         payload: sig
//     }
// }
