import $ from 'jquery'
import checkPermission from './init.crud'
import { GET_SOURCES_SERVER } from '../actions/init.actions'
// import {
//     GET_WEBHOOK_SELECTED_PROPS,
//     SET_WEBHOOK_SELECTED_PROPS_DB,
//     SET_WEBHOOK_SELECTED_PROPS,
//     UPDATE_NICKNAME,
//     TOGGLE_BLOCK,
//     AFTER_TOGGLE
// } from '../actions/webhook.actions'
import keys from '../../Config/keys';

//export const SET_WEBHOOK_SELECTED_PROPS = 'SET_WEBHOOK_SELECTED_PROPS';

//box
export const getWebhookPropertiesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_WEBHOOK_SELECTED_PROPS') {
        console.log(getState().conversations.selectedConversation.sourceIp)
        $.ajax({
            url: `${keys.API_URL}${getState().init.userName}/webhook/${getState().conversations.selectedConversation.sourceIp}/getProperties`,
            type: 'GET',
            success: function (data) {
                dispatch({ type: 'SET_WEBHOOK_SELECTED_PROPS', payload: data })
            },
            error: function (err) {
                console.log('reducer catch');
            }
        })
    }
    return next(action)
}
//box
export const setSelectedPropsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_WEBHOOK_SELECTED_PROPS_DB') {
        let webhookProps = action.payload;
        $.ajax({
            url: `${keys.API_URL}${getState().init.userName}/webhook/${getState().conversations.selectedConversation.sourceIp}/setProperties`,
            method: 'POST',
            headers: {
                contentType: "application/json",
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "properties": webhookProps }),
            success: function (data) {
                console.log("set webhook proprties from middleware", data);
                dispatch({ type: 'SET_WEBHOOK_SELECTED_PROPS', payload: data.properties })
            },
            error: function (err) {
                console.log(err)
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);
}
//box
export const updateNicknameMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_NICKNAME') {
        // debugger
        $.ajax({
            url: `${keys.API_URL}${getState().init.userName}/webhook/${action.payload.Sip}/updateNickname`,
            method: 'POST',
            data: { nickname: action.payload.nickname },
            success: function (data) {

            },
            error: function (err) {

                console.log(err)
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);
}
//box
export const toggleBlockMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'TOGGLE_BLOCK') {

        $.ajax({
            url: keys.API_URL + getState().init.userName + "/webhook/" + action.payload + "/toggleBlock",
            method: 'POST',
            success: function (data) {
                dispatch({
                    type: 'AFTER_TOGGLE',
                    payload: { ip: data.ip, blocked: data.blocked }
                })
            },
            error: function (err) {

                console.log(err)
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);
}

