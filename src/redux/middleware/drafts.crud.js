import $ from 'jquery'
import checkPermission from './init.crud'
// import {
//     GET_DRAFTS_SERVER, ADD_DRAFT_SERVER, EDIT_DRAFT_SERVER, DELETE_DRAFT_SERVER
// } from '../actions/draft.actions'
import NewFrame from '../../components/new-frame/NewFrame'
import keys from '../../Config/keys';
import { actions } from '../actions/action'

// export const SET_DRAFTS = 'SET_DRAFTS'
// export const ADD_DRAFT = 'ADD_DRAFT'
// export const EDIT_DRAFT = 'EDIT_DRAFT'
// export const DELETE_DRAFT = 'DELETE_DRAFT'

export const getDraftsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_DRAFTS_SERVER') {
        let name = ''
        const selectedSub = getState().subUsers.selectedSubUser
        if (selectedSub && selectedSub !== getState().init.userName) {
            name = selectedSub
        }
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/draft/getDrafts",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: name ? { subUser: name } : '',
            success: function (data) {
                console.log("get drafts from middleware", data.drafts);

                dispatch({ type: 'SET_DRAFTS', payload: data.drafts })
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const addDraftMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_DRAFT_SERVER') {
        console.log("ADD_DRAFT_SERVER",action.payload)
        $.ajax({
            url: keys.API_URL + action.payload.from + "/draft/addDraft",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { draft: action.payload },
            success: function (data) {
                console.log("new draft from middleware", data.newDraft);
                dispatch(actions.addDraft({ draft: data.newDraft, messageId: action.payload.messageId }))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const editDraftMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_DRAFT_ON_SERVER') {
        // if (action.payload.to.length===0) {
        //     action.payload = { ...action.payload, to: [],stam:'sss' }
        // }
        console.log("before edit draft", action.payload)
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/draft/editDraft",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { draft: action.payload },
            success: function (data) {
                console.log("edit draft from middleware", data.result)
                dispatch(actions.editDraft(data.result))
                // alert("draft saved")
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const deleteDraftMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_DRAFT_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/draft/deleteDraft",
            type: 'DELETE',
            headers: { Authentication: getState().init.jwt },
            data: { draftID: action.payload },
            success: function (data) {
                console.log("delete draft from middleware", data.draftID);
                dispatch(actions.deleteDraft(data.draftID))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}


