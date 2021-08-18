// import { SET_USERS_EMAILS, SET_CONTACTS, SET_USER } from '../middleware/init.crud'
// import { SET_NEW_CONTACTS } from '../middleware/group.crud'
// import {  EDIT_BACKGROUND_PHOTO } from '../middleware/subUsers.crud'
// import { SET_BODY_CLICKED, SET_SOURCES } from '../actions/init.actions';
// import { SET_NEW_CONTACT, SET_USER_FROM_MOBILE, SET_WEBHOOKS_BY_USER } from '../actions/init.actions'
// import { AFTER_TOGGLE } from '../actions/webhook.actions';
import produce from 'immer'
import keys from '../../Config/keys';
import { setNewContact, setSources } from '../actions/init.actions';
import createReducer from "./reducerUtils";

export const initialState = {
    user: "",
    usersEmails: [],
    sources: [],
    webhooks: [],
    contacts: [],
    userName: window.location.pathname.split('/')[1],
    jwt:
        document.cookie && document.cookie.includes(keys.JWT) ? document.cookie.split(";")
            .filter(s => s.includes(keys.JWT))[0].split("=").pop() : null,
    systemColors: [[
        // "#93389D", "#620E88", "#381AA2", "#393696", "#2062A0", "#2792A0",
        //  "#2C8D78", "#468B13", "#808E14", "#808E14", "#808E14", "#B1651A", 
        "#AA3316", "#A01B4B", "#B2434C"],
    ["#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#42C153", "#BFD41F", "#F0D923", "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B"]],
    bodyClicked: "",
    gmailUserAddress: "gilgolim@g.com",
    googleAuth: decodeURIComponent(document.cookie && document.cookie.includes('googleToken') ? document.cookie.split(';').filter(s => s.includes('googleToken'))[0].split('=').pop() : null),
    gmailMassageArrSent: [{ 'to': 'hgjhg', 'from': 'fhf' }],
    newContact: null,
    ifUserFromMobile: false,
}

const initReducer = {

    setUser(state, action) {
        state.user = action.payload;
    },
    setUsersEmails(state, action) {
        state.usersEmails = action.payload
    },
    setContacts(state, action) {
        state.contacts = action.payload
    },
    setBodyClicked(state, action) {
        state.bodyClicked = action.payload
    },
    setSources(state, action) {
        state.sources = action.payload
    },
    setNewContact(state, action) {
        state.contacts = [...state.contacts, action.payload]
    },
    setNewContacts(state, action) {
        state.contacts = state.contacts.concat(action.payload)
    },
    setUserFromMobile(state, action) {
        state.ifUserFromMobile = action.payload
    },

    setWebhooksByUser(state, action) {
        state.webhooks = action.payload
    },
    afterToggle(state, action) {
        state.webhooks.find(w => w.IP == action.payload.ip).blocked = action.payload.blocked;
    }
}

export default produce((state, action) => createReducer(state, action, initReducer), initialState);



