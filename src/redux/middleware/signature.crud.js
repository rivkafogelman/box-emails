import $ from 'jquery'
// import { ADD_SIGNATURE_SERVER, EDIT_SIGNATURE_SERVER, REMOVE_SIGNATURE_SERVER, GET_ALL_SIGNATURES_SERVER, UPLOAD_PHOTO_SIGNATURE_SERVER, UPLOAD_BANNER_PHOTO_SERVER, EDIT_SIGNATURE } from '../actions/signature.actions'
import keys from '../../Config/keys';
import { actions } from '../actions/action'

// export const ADD_SIGNATURE = 'ADD_SIGNATURE'
// export const SET_SIGNATURES_LIST = 'SET_SIGNATURES_LIST'
// export const REMOVE_SIGNATURE = 'REMOVE_SIGNATURE'
// export const SET_SIGNATURE = 'SET_SIGNATURE'

export const getAllSignaturesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_SIGNATURES_SERVER') {
        let name = ''
        const selectedSub = getState().subUsers.selectedSubUser
        if (selectedSub && selectedSub !== getState().init.userName) {
            name = selectedSub
        }

        $.ajax({
            url: keys.API_URL + getState().init.userName + '/signature/getAllSignatures',
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: name ? { subUser: name } : '',
            success: function (data) {

                console.log("data signature from middleware", data);
                // dispatch({ type: 'SET_SIGNATURES_LIST', payload: data.signatures })
                dispatch(actions.setSignaturesList(data.signatures))
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    return next(action)
}

export const addSignatureMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_SIGNATURE_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + '/signature/newSignature',
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { signature: action.payload },
            success: function (data) {
                if (data === 'You already have 3 signatures') { alert(data) }
                else {
                    console.log("data.signature from middleware ", data.newSignature);
                    // dispatch({ type: 'ADD_SIGNATURE', payload: data.newSignature })
                    dispatch(actions.addSignature(data.newSignature))
                }
            },
            error: function (err) {

                console.log(err);
            }
        })
    }
    return next(action)
}

export const removeSignatureMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'REMOVE_SIGNATURE_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + '/signature/deleteSignature',
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { signatureId: action.payload },
            success: function (data) {
                console.log("data from removeSignatureMidd", data);
                // dispatch({ type: 'REMOVE_SIGNATURE', payload: action.payload })
                dispatch(actions.removeSignature(action.payload))
            },
            error: function (err) {
                console.log("error in removeSignatureMidd ", err)
            }
        })
    }
    return next(action)
}

export const editSignatureMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_SIGNATURE_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + '/signature/editSignature',
            type: 'POST',
            headers: {
                Authentication: getState().init.jwt
            },
            data: { signature: action.payload },
            success: function (data) {
                console.log("edit signature from middleware", data.existSignature);
                // dispatch({ type: 'SET_SIGNATURE', payload: data.existSignature })
                dispatch(actions.setSignature(data.existSignature));
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    return next(action)
}

export const uploadPhotoSignatureMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOAD_PHOTO_SIGNATURE_SERVER' || action.type === 'UPLOAD_BANNER_PHOTO_SERVER') {
        $.ajax({
            url: keys.API_URL + 'getUidByUserName/' + getState().subUsers.selectedSubUser,
            type: 'GET',
            headers: {
                Authentication: getState().init.jwt
            },
            success: function (data) {
                console.log("get uId from middleware", data.uid);
                // sendPhotoToServer(getState, action, dispatch, data.uid)
                dispatch(actions.uploadPhotoInFiles(action.payload))
                // dispatch({ type: 'UPLOAD_PHOTO_IN_FILES', payload: action.payload })
            },
            error: function (err) {
                console.log(err);
            }
        })

    }
    return next(action)
}
//box
export const uploadPhotoInFiles = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOAD_PHOTO_IN_FILES' || action.type === 'UPLOAD_BANNER_IN_FILES') {
        let userName = getState().init.userName;
        let myFile = action.payload;

        $.ajax({
            type: "POST",
            url: keys.FILES_URL + userName + "/upload",
            // url: keys.API_URL + "signature/uploadPhotoInFiles",
            headers: { Authorization: getState().init.jwt },
            // headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaXRtZnFVd3A2TWZoZ0xidTI3WmwwMGFkUUQzIiwiZW1haWwiOiJzYXJhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMDAyMzE2OX0.J5tRO7h6-vAJ3DwSYyF2u3Eyw1EF9JN_JiSJeXCUkiM' },
            data: myFile,
            processData: false,
            contentType: false,
            success: (data) => {
                let newUrl = data.data.url
                newUrl = newUrl.replace('apps/', '');

                console.log('upload success')
                if (action.type === 'UPLOAD_BANNER_IN_FILES') {
                    // dispatch({ type: 'EDIT_SIGNATURE', payload: { fieldValue: data.data.url, fieldName: "banner", fieldNameInObj: "imgUrl" } })
                  
                    dispatch(actions.editSignature({ fieldValue: newUrl, fieldName: "banner", fieldNameInObj: "imgUrl" }))
                }
                // UPLOAD_PHOTO_IN_FILES
                else {

                    // dispatch({ type: 'EDIT_SIGNATURE', payload: { fieldValue: data.data.url, fieldName: "upload_photo", fieldNameInObj: "url" } })
                    dispatch(actions.editSignature({ fieldValue: newUrl, fieldName: "upload_photo", fieldNameInObj: "url" }))

                }
            },
            error: function (err) {
                console.log('please try again later');
            },
        });
    }
    return next(action)
}

const sendPhotoToServer = (getState, action, dispatch, uId) => {

    $.ajax({
        url: keys.API_URL + getState().init.userName + '/signature/uploadPhoto/' + uId,
        type: 'POST',
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        async: false,
        headers: {
            "authorization": getState().init.jwt
        },
        data: action.payload,
        success: function (data, action) {
            console.log("upload photo signature from middleware", data);
            setTimeout(() => {
                if (action.type === 'UPLOAD_PHOTO_SIGNATURE_SERVER') {
                    // dispatch({ type: 'EDIT_SIGNATURE', payload: { fieldValue: data, fieldName: "upload_photo", fieldNameInObj: "url" } })
                    dispatch(actions.editSignature({ fieldValue: data, fieldName: "upload_photo", fieldNameInObj: "url" }))

                }
                else if (action.type === 'UPLOAD_BANNER_PHOTO_SERVER') {
                    // dispatch({ type: 'EDIT_SIGNATURE', payload: { fieldValue: data, fieldName: "banner", fieldNameInObj: "imgUrl" } })
                    dispatch(actions.editSignature({ fieldValue: data, fieldName: "banner", fieldNameInObj: "imgUrl" }))

                }
            }, 1000)
        },
        error: function (err) {
            console.log(err);
        }
    });
}