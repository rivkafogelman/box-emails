import $ from "jquery";
// import { SET_SO URCES, GET_USER_SERVER, GET_USERS_EMAILS_SERVER, GET_CONTACTS_SERVER, EXTRACT_JWT, GET_SOURCES_SERVER, GET_WEBHOOKS_BY_USER } from '../actions/init.actions'
// import{SET_MAIL_CHANELLS} from '../actions/subUsers.actions'
import keys from '../../Config/keys';

// export const SET_USER = 'SET_USER'
// export const SET_USERS_EMAILS = 'SET_USERS_EMAILS'
// export const SET_CONTACTS = 'SET_CONTACTS'
// export const SET_WEBHOOKS_BY_USER = 'SET_WEBHOOKS_BY_USER'
// export const SET_JWT='SET_JWT'
// export const SET_DEFAULT_SIGNATURE = 'SET_DEFAULT_SIGNATURE'
// export const SET_SELECTED_SUB_USERS='SET_SELECTED_SUB_USERS'

export const extractJwtMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EXTRACT_JWT') {
        let params = (new URL(document.location)).searchParams;
        let jwtGlobal = params.get('jwt');
        if (jwtGlobal) {
            let newUrl = window.location.href
            newUrl = newUrl.split('?jwt=')
            newUrl = newUrl[0]
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            var expires = "expires=" + date;
            if (!(document.cookie.split(";").filter(s => s.includes(`${keys.JWT}`))[0]) || document.cookie.split(";").filter(s => s.includes(`${keys.JWT}`))[0] === '')
                document.cookie = `${keys.JWT}` + "=" + jwtGlobal + ";" + expires + `;domain=.leader.codes;path=/`;
            // if (!(document.cookie.split(";").filter(s => s.includes(keys.JWT))[0]) || document.cookie.split(";").filter(s => s.includes(keys.JWT))[0] === '')
            // document.cookie = `${keys.JWT}` + "=" + jwtGlobal + ";" + expires  + `;domain=${keys.COOKIES_DOMAIN};path=/`;
            window.location.replace(newUrl)
        }
    }
    return next(action)
}

export const getUserMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_USER_SERVER') {
        let userName = getState().init.userName
        $.ajax({
            url: keys.API_URL + "getUser/" + userName,
            type: 'GET',
            headers: getState().init.jwt,
            success: function (data) {
                console.log("data.in getUserMidd", data.user);
                dispatch({ type: 'SET_USER', payload: data.user })
                dispatch({ type: 'SET_DEFAULT_SIGNATURE', payload: data.user })
                dispatch({ type: 'SET_MAIL_CHANNELS', payload: data.user.mailChannels })
            },
            error: function (err) {
            console.log("err in getUserMidd", err)
                checkPermission(err).then((res) => { }).catch(() => {
                    console.log("not registered")
                })
            }
        })
    }
    return next(action)
}

export const getUsersEmailsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_USERS_EMAILS') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/contact/getUsersEmails",
            type: 'GET',
            headers: { Authentication: getState().init.jwt },
            success: function (data) {
                console.log("data.userEmails from middleware", data.users);
                dispatch({ type: 'SET_USERS_EMAILS', payload: data.users })
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}

export const getContactsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_CONTACTS_SERVER') {
        
        let name
        const selectedSub = getState().subUsers. selectedSubUser
        if (selectedSub && selectedSub !== getState().init.userName) {
            name = selectedSub
        }
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/contact/getAllContacts",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: name ? { subUser: name } : '',
            success: function (data) {
                console.log("data.contacts from middleware", data.contacts);
                if (data.contacts) {
                    dispatch({ type: 'SET_CONTACTS', payload: data.contacts })
                }
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    if (res) {
                        dispatch({ type: 'SET_CONTACTS', payload: [] })
                    }
                })
            }
        })
    }
    return next(action)
}


export const getSourcesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_SOURCES') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/source/getSources",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            success: function (data) {
                console.log("data.sources from middleware", data.sources);
                const isSystemWave = (source) => {
                    const wave = getState().conversations.systemWaves.find(w => w.source == source.name);
                    if (wave)
                        return true;
                    return false;
                }
                const sources = data.sources.filter(s => isSystemWave(s));
                console.log('filtered sourcesss', sources);
                dispatch({ type: 'SET_SOURCES', payload: sources })
            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log(res)
                })
            }
        })
    }
    return next(action)
}

export default function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status === "401") {
            result.routes ?
                window.location.assign(`${keys.LEADER_CODES}login?des=${result.responseJSON.des}'&routes='${result.responseJSON.routes}`) :
                window.location.assign(`${keys.LEADER_CODES}login?des=${result.responseJSON.des}`)
            reject(false)
        }
        resolve(true)
    })
}


export const getWebhooksByUserMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_WEBHOOKS_BY_USER') {
        $.ajax({
            url: `${keys.API_URL}${getState().init.userName}/webhook/getWebhooksByUser`,
            method: 'GET',
            success: function (data) {
                console.log('data in getWebhooksByUserMidd',data)
                dispatch({ type: 'SET_WEBHOOKS_BY_USER', payload: data.webhooks })
            },
            error: function (err) {
                console.log('err in getWebhooksByUserMidd',err)
                checkPermission(err).then((res) => { })
            }
        });
    }
    return next(action);
}
