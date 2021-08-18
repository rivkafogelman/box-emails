import $ from "jquery";
import keys from '../../Config/keys';
import { actions } from '../actions/action'


export const getSettings = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_SETTINGS_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + '/setting/getSettingsBox',
            type: "POST",
            success: function (data) {
                console.log("data in getSettings", data.settingsBox);
                if (data.settingsBox)
                    dispatch(actions.setSettings(data.settingsBox))
            },
            error: function (err) {
                console.log("err in getSettings", err)
            }
        })
    }
    return next(action)
}

export const changeTextColor = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CHANGE_TEXT_COLOR_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + '/setting/changeTextColor',
            type: "POST",
            data: { textColor: action.payload },
            success: function (data) {
                console.log("err in changeTextColor", data)
                dispatch(actions.setColorText(data.userSetting.textColor))
            },
            error: function (err) {
                console.log("err in changeTextColor", err)
            }
        })
    }
    return next(action)
}

export const uploadPhoto = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOAD_PHOTO') {
        let userName = getState().init.userName;
        let myFile = action.payload;
        $.ajax({
            type: "POST",
            url: keys.FILES_URL + getState().init.userName + "/upload",
            headers: { Authorization: getState().init.jwt },
            data: myFile,
            processData: false,
            contentType: false,
            success: (data) => {
                console.log('upload success')
                let newUrl = data.data.url
                newUrl = newUrl.replace('apps/', '');

                dispatch(actions.addBackgroundPhotoServer({ photo: { name: data.data.name, url: newUrl } }))

            },
            error: function (err) {
                console.log('faild load photo');
            },
        });
    }
    return next(action)
}

export const addBackgroundPhoto = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_BACKGROUND_PHOTO_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/setting/addBackgroundPhoto",
            type: "POST",
            data: action.payload,
            success: function (data) {
                if (data.photo)
                    dispatch(actions.setAddBackgroundPhoto(data.photo))
                if (data.backgroundPhotos)
                    dispatch(actions.setBackGroundPhotos(data.backgroundPhotos))
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    return next(action)
}

export const deleteBackgroundPhoto = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_BACKGROUND_PHOTO_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/setting/deleteBackgroundPhoto",
            type: "POST",
            data: { name: action.payload },
            success: function (data) {
                dispatch(actions.deleteBackgroundPhoto(action.payload))
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    return next(action)
}

export const setBackGroundEmail = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_BG_EMAIL') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/setting/editBackgroundEmail",
            type: "POST",
            // headers: { Authentication: getState().init.jwt },
            data: { name: action.payload },
            success: function (data) {
                console.log("bg_email", data.bgPhoto);
                dispatch(actions.editBackgroundPhoto(data.bgUrl))
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    return next(action)
}