import $ from 'jquery'
import { setNotification, UNDO_LAST_NOTIFICATION } from '../actions/notification.actions'
import { GET_TAGS_SERVER, ADD_TAG_SERVER, DELETE_TAG_SERVER, DELETE_TAGS_SERVER, EDIT_TAG_SERVER, EDIT_TAGS_SERVER } from '../actions/tag.actions'
import checkPermission from './init.crud'

// all text
import allText from '../../allText.json'
import keys from '../../Config/keys';
export const SET_TAGS = 'SET_TAGS'
export const ADD_TAG = 'ADD_TAG'
export const DELETE_TAG = 'DELETE_TAG'
export const EDIT_TAG = 'EDIT_TAG'

export const getTagsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TAGS_SERVER') {
       // let array = []
        let name =''
        const selectedSub=getState().subUsers. selectedSubUser
        if (selectedSub&&selectedSub!==getState().init.userName) {
            name = selectedSub
        }
        $.ajax({
            url: keys.API_URL + getState().init.userName + '/tag/getAllTags',
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
             data: name ? { subUser: name  } : '',
            success: function (data) {
                console.log("data.tags from middleware", data.tags); 
                dispatch({ type: 'SET_TAGS', payload: data.tags })
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const addTagMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_TAG_SERVER') {
        //  
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                //  
                $.ajax({
                    url: keys.API_URL + getState().subUsers. selectedSubUser + '/tag/newTag',
                    type: 'POST',
                    headers: { Authentication: getState().init.jwt },
                    data: { tag: action.payload },
                    success: function (data) {
                        console.log("data.tag1 from middleware", data.tag1);
                        dispatch({ type: 'ADD_TAG', payload: data.tag1 })
                    },
                    error: function (err) {
                        console.log("🚀 ~ file: tags.crud.js ~ line 45 ~ setTimeout ~ err", err)
                        checkPermission(err).then((res) => { })
                        //show notification ERR in add label;
                        const notificationToShow = { info: allText['errorCreateLabel'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel add label');
                dispatch({ type: UNDO_LAST_NOTIFICATION })
            }
        }, 3000);
    }
    return next(action)
}

export const deleteTagMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_TAG_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: keys.API_URL + getState().subUsers. selectedSubUser + '/tag/deleteTag',
                    type: 'DELETE',
                    headers: {
                        Authentication: getState().init.jwt
                    },
                    data: { tagID: action.payload },
                    success: function (data) {
                        console.log("delete tag from middleware", data);
                        dispatch({ type: 'DELETE_TAG', payload: action.payload })
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        //show notification ERR in delete label;
                        const notificationToShow = { info: allText['errorDeletingLabel'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel delete label');
                dispatch({ type: UNDO_LAST_NOTIFICATION })
            }
        }, 3000);
    }
    return next(action)
}

export const editTagMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_TAG_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers. selectedSubUser + '/tag/editTag',
            type: 'POST',
            headers: {
                Authentication: getState().init.jwt
            },
            data: { "tag": action.payload },
            success: function (data) {
                console.log("edit tag from middleware", data.result);
                dispatch({ type: 'EDIT_TAG', payload: data.result })
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
                //show notification ERR in edit label;
                const notificationToShow = { info: allText['errorUpdtaeLabel'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                dispatch(setNotification(notificationToShow));
            }
        })
    }
    return next(action)
}


//     deleteTags = (tagsID) => {
//         return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/editTags', {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authentication": jwt
//             },
//             body: JSON.stringify({ "tagsID": tagsID })
//         }).then(res => { return res.json() }).then((result) => {
//             console.log(result);
//             return result
//         }, (error) => {

//             console.log(error)
//             return error.message
//         })
//     }



//     editTags = (tagsID, color) => {
//         return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/editTags', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authentication": jwt
//             },
//             body: JSON.stringify({
//                 "tagsList": tagsID,
//                 "color": color
//             })
//         }).then(res => { return res.json() }).then((result) => {
//             console.log(result);
//             return result
//         }, (error) => {

//             console.log(error)
//             return error.message
//         })
//     }


