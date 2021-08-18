// import { ADD_LEAD_SERVER, ADD_CONTACT_SERVER } from '../actions/lead.actions'
import $ from 'jquery'
import checkPermission from './init.crud'
// import { setNotification, UNDO_LAST_NOTIFICATION } from '../actions/notification.actions'
// import { updateGroup, setContacstIdNewGroup } from '../actions/group.actions'
// import { setDisplayRightCard } from '../actions/conversation.actions'
// import { setNewContact } from '../actions/init.actions'
// import { addGroup } from '../actions/group.actions'
// import { createSystemWave } from '../actions/conversation.actions'
import keys from '../../Config/keys';
// all text
import allText from '../../allText.json'
import {actions} from '../actions/action'

// export const SET_NEW_CONTACT = 'SET_NEW_CONTACT'
const bodyFromFields = (deal) => {
    let str = ``;
    for (let key in deal) {
        if (deal[key] !== undefined && deal[key] !== '')
            str += `<p>${key}: ${deal[key]}<p>`
    }
    return str;
}
export const createLead = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_LEAD_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {

                console.log("add lead server")
                let urlData = `${keys.API_URL}${getState().init.userName}/createContact`;
                let lead = action.payload;
                $.ajax({
                    url: urlData,
                    method: 'POST',
                    headers: {
                        Authorization: getState().init.jwt
                    },
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(lead),
                    success: function (data) {
                        let leadSystemWave = {
                            subject: "New lead created successfully",
                            body: bodyFromFields(lead),
                            from: "@CRM",
                            source: "CRM",
                            files: null
                        }
                        dispatch(actions.createSystemWave(leadSystemWave))
                        console.log("new lead from middleware ", data);
                    },
                    error: function (err) {
                        console.log(err)
                     
                        let leadSystemWave = {
                            subject: "New lead created successfully",
                            body: bodyFromFields(lead),
                            from: "@CRM",
                            source: "CRM",
                            files: null
                        }
                        dispatch(actions.createSystemWave(leadSystemWave))
                        console.log("not create lead middleware ");
                        checkPermission(err).then((res) => { })
                    }
                });
            }
            else {
                console.log('cancel add lead');
                dispatch({ type: 'UNDO_LAST_NOTIFICATION' })
            }
        });
    }
    return next(action);
}

export const createContact = ({ dispatch, getState }) => next => action => {

    if (action.type === 'ADD_CONTACT_SERVER') {

        console.log("add contact server")
        let urlData = `${keys.API_URL}${getState().init.userName}/createContact`;
        let contact = action.payload.contact;
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().init.jwt
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(contact),
            success: function (data) {
                console.log("new lead from middleware ", data);
                if (action.payload.group) {
                    let group = action.payload.group;
                    group.members.push(data.newContact.email)
                    dispatch(actions.setNewContact(data.newContact))
                    // להוסיף פה את התנאי אם זה הוספה קבוצה חדשה או עידכון
                    if (action.payload.newGroup && action.payload.newGroup == true)
                        dispatch(actions.addGroup(group))
                    else
                        dispatch(actions.updateGroup(group))
                }
                // add contact in new group
                else {
                    dispatch(actions.setNewContact(data.newContact))
                    dispatch(actions.setContacstIdNewGroup(data.newContact._id))
                }
            },
            error: function (err) {
                console.log(err)
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);

}

