

import { ADD_DEAL_SERVER } from '../actions/addDeal.actions'
import $ from 'jquery'
import checkPermission from './init.crud'
// import { setNotification, UNDO_LAST_NOTIFICATION } from '../actions/notification.actions'
import allText from '../../allText.json';
// import { createSystemWave } from '../actions/conversation.actions'
import keys from '../../Config/keys';
import { actions } from '../actions/action'

const bodyFromFields = (deal) => {
    let str = ``;
    for (let key in deal) {
        if (deal[key] !== undefined && deal[key] !== '')
            str += `<p>${key}: ${deal[key]}<p>`
    }
    return str;
}

//box
export const addDeal = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_DEAL') {

        let userName = getState().init.userName;
        let urlData = `${keys.API_URL}${userName}/contact/addDeal`
        let deal = action.payload;
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().init.jwt
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(deal),
            success: function (data) {
                console.log("🚀 ~ file: deal.crud.js ~ line 24 ~ //setTimeout ~ data", data)
                let leadSystemWave = {
                    subject: "New deal created successfully",
                    body: bodyFromFields(deal),
                    // name: data.newContact.name,
                    // email: data.newContact.email,
                    from: "@CRM",
                    source: "CRM",
                    files: null
                }
                dispatch(actions.createSystemWave(leadSystemWave))
                console.log("new lead from middleware ", data);
                //show notification create deal
                const notificationToShow = { info: allText['dealCreated'], icon: null, color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                dispatch(actions.setNotification(notificationToShow));
            },
            error: function (err) {
                console.log(err)
                let leadSystemWave = {
                    subject: "New deal created successfully",
                    body: bodyFromFields(deal),
                    from: "@CRM",
                    source: "CRM",
                    files: null
                }
                dispatch(actions.createSystemWave(leadSystemWave))
                console.log("no new lead was created ");
                //show notification err create lead
                // const notificationToShow = { info: allText['errorCreateDeal'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                // dispatch(actions.setNotification(notificationToShow));
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);
}