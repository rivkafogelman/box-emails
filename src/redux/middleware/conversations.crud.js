import $ from 'jquery'
import checkPermission from './init.crud'
import keys from '../../Config/keys';
import { actions } from '../actions/action'
// all text
import allText from '../../allText.json'
export const getConversationsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_CONVERSATIONS_SERVER') {
        let conversationIdToSet = window.location.hash.split('/')[1]
        let name = ''
        const selectedSub = getState().subUsers.selectedSubUser
        if (selectedSub && selectedSub !== getState().init.userName) {
            name = selectedSub
        }
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/conversation/getAllConversations",
            type: 'POST',
            headers: { Authorization: getState().init.jwt },
            data: name ? { subUser: name } : '',
            success: function (data) {
                dispatch(actions.setConversations(
                    { conversations: data.Conversations, userEmail: name ? name + '@mails.codes' : '', mailChannels: getState().subUsers.mailChannels })
                )
                if (conversationIdToSet) {
                    let conversationToSet = data.Conversations.filter(c => c._id == conversationIdToSet)
                    if (conversationToSet.length != 0)
                        dispatch(actions.setSelectedConversation(conversationToSet[0]))
                        dispatch(actions.setShowOpenConversation(true))
                }
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}
export const getSystemWavesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_SYSTEM_WAVES_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/wave/getSystemWaves",
            type: 'POST',
            headers: { Authorization: getState().init.jwt },
            success: function (data) {
                console.log("get system waves from middleware", data.systemWaves);
                dispatch(actions.setSystemWaves(data.systemWaves))
                dispatch(actions.getSources());
            },
            error: function (err) {
                console.log("err in getSettings getSystemWavesMidd", err)
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const newConversationMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_CONVERSATION_SERVER') {
        let userName = getState().conversations.emailFromAddress.split('@')[0]
        if (!userName) {
            userName = getState().subUsers.selectedSubUser
        }
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: keys.API_URL + userName + "/conversation/newConversation",
                    type: 'POST',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversation: action.payload.conversation, wave: action.payload.wave, forwardConversationId: action.payload.forwardConversationId },
                    headers: { Authorization: getState().init.jwt },
                    success: function (data) {
                        console.log("new conversation from middleware", data.newConversation);
                        console.log("new newContactsToSend from middleware", data.newContactsToSend);

                        if (data.newContactsToSend.length && data.newContactsToSend[0] != null) {
                            dispatch(actions.setNewContacts(data.newContactsToSend))
                        }
                        if (!action.payload.forwardConversationId) {
                            // if (!action.payload.forwardConversationId && !action.payload.wave.from) {
                            dispatch(actions.addConversation(data.newConversation))
                        }
                        else {
                            dispatch(actions.addWave({ newWave: data.newWave, conversation: data.newConversation }))
                        }
                        let attachments = []
                        if (action.payload.wave.files.length > 0) {
                            action.payload.wave.files.map((file) => {
                                attachments.push({ filename: file.name, path: file.url })
                            })
                        }
                        dispatch(actions.deleteDraft(action.payload.draftId))
                        dispatch(actions.sendEmailServer({
                            subject: action.payload.conversation.subject,
                            messageBody: action.payload.wave.body,
                            emailTo: action.payload.wave.to,
                            username: userName,
                            conversationId: data.newConversation._id,
                            attachments: attachments
                        })
                        )
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        //show notification ERR in send mail
                        const notificationToShow = { info: allText['errorSendingEmail'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true, draftId: action.payload.draftId }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel send mail');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}

export const newWaveMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_WAVE_SERVER') {

        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/wave/newWave",
            type: 'POST',
            headers: { Authorization: getState().init.jwt },
            data: { wave: action.payload.wave },
            success: function (data) {
                console.log("new wave from middleware", data.newWave);
                // if (action.payload.wave.reply) { data.newWave.reply = true }
                dispatch(actions.addWave({ newWave: data.newWave, conversation: data.newConversation }))
                dispatch(actions.sendEmailServer({
                    references: action.payload.wave.references,
                    inReplyTo: action.payload.wave.inReplyTo,
                    subject: action.payload.wave.subject,
                    messageBody: data.newWave.body,
                    emailTo: data.newWave.to,
                    username: getState().subUsers.selectedSubUser
                }
                ))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}
export const editConversationMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_CONVERSATION_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                console.log("in edittttt", action.payload);
                let editSystemWaves = getState().conversations.displaySystemWaves
                let url
                //to change it!!!
                if (editSystemWaves) {
                    url = keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/editConversation"
                }
                else {
                    url = keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/editConversation"
                }
                debugger
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversation: action.payload },
                    success: async function (data) {
                        console.log("edit conversation from middleware", data.result)
                        await dispatch(actions.editConversation({ conversation: data.result, field: action.payload.field, userEmail: getState().init.userName + '@mails.codes' }))
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        //show notification ERR in edit cons
                        // const notificationToShow = { info: 'error edit conversation.', icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        // dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel edit conversation');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}
export const editConversationsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_CONVERSATIONS_SERVER') {
        // dispatch(actions.editConversationsBefore({ conversations: action.payload.conversations,field: action.payload.field, userEmail: getState().init.userName + '@mails.codes' }))
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                let userName = getState().subUsers.selectedSubUser || getState().init.userName;
                $.ajax({
                    url: keys.API_URL + userName + "/conversation/editConversations",
                    type: 'POST',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversations: action.payload.conversations },
                    success: function (data) {
                        console.log("edit conversations from middleware", data.editedConversations);
                        dispatch(actions.editConversations({ conversations: data.editedConversations, field: action.payload.field, userEmail: getState().init.userName + '@mails.codes' }))
                    },
                    error: function (err) {
                        dispatch(actions.editConversationsErr({ conversations: action.payload.conversations, field: action.payload.field, userEmail: getState().init.userName + '@mails.codes'}))
                        console.log("🚀 ~ file: conversations.crud.js ~ editConversationsMidd ~ err", err)
                        checkPermission(err).then((res) => { })
                        //show notification ERR in edit cons
                        const notificationToShow = { info: 'eror in edit', icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel edit mails');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}

export const deleteConversationsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_CONVERSATIONS_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/deleteConversations",
                    type: 'DELETE',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversationsID: action.payload },
                    success: function (data) {
                        console.log("delete conversations from middleware", data);
                        dispatch(actions.deleteConversations(action.payload))
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        //show notification ERR in delete cons
                        const notificationToShow = { info: allText['errorDeleteEmails'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel delete mails');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}

export const deleteSystemWavesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_SYSTEM_WAVES_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/deleteSystemWaves",
                    type: 'DELETE',
                    headers: { Authorization: getState().init.jwt },
                    data: { ids: action.payload },
                    success: function (data) {
                        console.log("delete systemWaves from middleware", data);
                        dispatch(actions.deleteSystemWaves(action.payload))
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { });
                        //show notification ERR in delete system waves
                        const notificationToShow = { info: allText.notification.errorDeleteConversations, icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel delete system waves');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}
export const deleteConversationMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_CONVERSATION_SERVER') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/deleteConversation",
                    type: 'DELETE',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversationID: action.payload },
                    success: function (data) {
                        console.log("delete conversation from middleware", data);
                        dispatch(actions.deleteConversation())
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        //show notification ERR in delete mail
                        const notificationToShow = { info: allText['errorDeleteEmail'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel delete mail');
                dispatch(actions.undoLastNotification())
            }
        }, 3000);
    }
    return next(action)
}
export const uploadFilesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOAD_FILES_SERVER') {
        return fetch(keys.API_URL + getState().subUsers.selectedSubUser + "/wave/uploadFiles", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: getState().init.jwt
            },
            body: action.payload
        }
        ,
            // (event) => {
            //     dispatch({ type: SET_UPLOAD_PROGRESS, payload: (Math.round((100 * event.loaded) / event.total)) })}
        ).then(res => { return res.json() }).then(
            (result) => {
                return result.files
            },
            (error) => {
                console.log(error)
            }
        )
        //   ;

        // $.ajax({
        //     type: "POST",
        //     url: "https://files.codes/api/" + getState().init.userName + "/upload",

        //     headers: { Authorization: getState().init.jwt },
        //     data: action.payload,
        //     processData: false,
        //     contentType: false,
        //     success:
        //         console.log('success')
        // })
        //     .then((res) => {
        //         console.log(res, "ressssss")
        //           

        //     })
    }
    return next(action)
}
export const downloadFileMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DOWNLOAD_FILE_SERVER') {
        console.log('in down:(')
        const file = action.payload
        const url = file.url
        console.log(file.url)
        let jwt = getState().init.jwt
        // $.ajax({
        //     type: "GET",
        //     url: "https://files.codes/api/" + getState().init.userName + "/download/" + url,
        //     // headers: { Authentication: jwt },
        //     headers: { Authorization: getState().init.jwt },

        //     success: function (data) {
        //         console.log('download')
        //     },
        //     error: function (err) {
        //         alert(err);
        //     },

        window.open(`https://files.codes/api/${getState().init.userName}/download/${url}?jwt=${jwt}`)


        // fetch("https://files.codes/api/" + getState().init.userName + "/download/" +
        //     url, {

        //     method: 'GET',
        //     headers: {
        //         Authorization: getState().init.jwt
        //     },
        // })
        //     .then(resp => resp.blob())
        //     .then(blob => {

        //         // const url = window.URL.createObjectURL(blob);
        //         // const a = document.createElement('a');
        //         // a.style.display = 'none';
        //         // a.href = url;
        //         // // the filename you want
        //         // a.download = file.name.split('__')[1];
        //         // document.body.appendChild(a);
        //         // a.click();
        //         // window.URL.revokeObjectURL(url);
        //         alert('your file has downloaded!');
        //     })
        //     .catch(() => alert('oh no!'));

    }
    return next(action)
}
export const sendEmailMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SEND_EMAIL_SERVER') {
        let html = action.payload.messageBody
        let newHtml = ""
        let bodyArr = html.split('"custom-class-to-image"')
        let i
        for (i = 0; i < bodyArr.length - 1; i++) {
            newHtml += bodyArr[i] + `"custom-class-to-image" style:"width:25px; height:25px" `;
        }
        newHtml += " " + bodyArr[i];
        console.log("NewHtml", newHtml)
        action.payload.messageBody = newHtml
        console.log("payloaddddd", action.payload);
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/sendConversationByEmail",
            type: 'POST',
            headers: { Authorization: getState().init.jwt },
            data: action.payload,
            success: function (data) {
                console.log("send email data from middleware", data);
                console.log("messageId", data.body.messageId);
                debugger
                if (action.payload.references === undefined && data.body.messageId !== undefined) {
                    dispatch(actions.editConversationServer({ _id: action.payload.conversationId, messageId: data.body.messageId }))
                }
            },
            error: function (err) {
                console.log("err send email " + err);
                // checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const createSystemWave = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_SYSTEM_WAVE') {
        let systemWave = {
            subject: action.payload.subject,
            body: action.payload.body,
            to: [getState().subUsers.selectedSubUser],
            from: action.payload.from,
            source: action.payload.source,
            files: null
        }
        console.log(JSON.stringify(systemWave))
        $.ajax({
            url: keys.API_URL + "createSystemWave",
            type: 'POST',
            // headers: { Authorization: getState().init.jwt },
            data: systemWave,
            success: function (data) {
                console.log("send systemWave from middleware", data);
            },
            error: function (err) {
                console.log("err send systemwave " + err);
            }

            // {
            //     "subject": "to me:):)",
            //     "body": "get the body' display all details.good luck <a href='https://leader.codes/login#'>linkkk</a> ",
            //     "to": ["michalgiladi"],
            //     "from": "@calendar",
            //     "source": "Calendar",
            //     "files": null
            // }
        })
    }
    return next(action)
}

export const markAsReadOrUnreadConversations = ({ dispatch, getState }) => next => action => {
    if (action.type === 'MARK_AS_READ_OR_UNREAD_CONVERSATIONS_MIDD') {
        setTimeout(() => {
            if (getState().notification.cancel === false) {
                $.ajax({
                    url: `${keys.API_URL}${getState().subUsers.selectedSubUser}/conversation/markAsReadOrUnreadConversations`,
                    type: 'POST',
                    headers: { Authorization: getState().init.jwt },
                    data: { conversations: action.payload },
                    success: function (data) {
                        dispatch(actions.markAsReadOrUnreadConversations(data))
                    },
                    error: function (err) {
                        checkPermission(err).then((res) => { })
                        console.log("err markAsReadOrUnreadConversations " + err);
                        //show notification ERR in markAsReadOrUnreadConversations cons
                        const notificationToShow = { info: allText['error'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
                        dispatch(actions.setNotification(notificationToShow));
                    }
                })
            }
            else {
                console.log('cancel delete mails');
                dispatch(actions.undoLastNotification)
                // to zero the conversationsIdsToEdit arr in store;
                dispatch(actions.setConversationsIdsToEdit({ check: null }))
            }
        }, 3000);
    }
    return next(action);
}

export const markAsTrashConversationsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'MARK_AS_TRASH_CONVERSATIONS_MIDD') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/conversation/markAsTrashConversations",
            type: 'POST',
            headers: { Authorization: getState().init.jwt },
            data: { conversations: action.payload },
            success: function (data) {
                console.log("markAsTrashConversations", data);
                dispatch(actions.markAsTrashConversations(data))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

//     downloadFile = (fileURL) => {
//         
//         return fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/pdf',
//             },
//         })
//             .then((response) => response.blob())
//             .then((blob) => {
//                 // Create blob link to download
//                 const url = window.URL.createObjectURL(
//                     new Blob([blob]),
//                 );
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute(
//                     'download',
//                     `FileName.pdf`,
//                 );

//                 // Append to html link element page
//                 document.body.appendChild(link);

//                 // Start download
//                 link.click();

//                 // Clean up and remove the link
//                 link.parentNode.removeChild(link);
//             });
//     }

