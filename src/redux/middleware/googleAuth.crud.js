// import $ from 'jquery'
// // import {  GET_TAGS_SERVER } from '../actions/tag.actions'
// import {
//   SAVE_GOOGLE_TOKEN,
//   GET_LABELS_GMAIL_SERVER,
//   GET_MESSAGES_GMAIL_SERVER,
//   ADD_GMAIL_TAG_SERVER,
//   GET_GMAIL_ADDRESS_SERVER,
//   SEND_GMAIL,
//   GET_IF_GMAIL_LABELS_SERVER
// } from '../actions/googleAuth.actions'
// import checkPermission from './init.crud'
// import { SET_CONVERSATIONS } from './conversations.crud'

// // all text
// import allText from '../../allText.json'
// import { setNotification, UNDO_LAST_NOTIFICATION } from '../actions/notification.actions'
// export const ADD_GMAIL_TAG = 'ADD_GMAIL_TAG'
// export const ADD_TAG = 'ADD_TAG'
// export const SET_TAG_BY_GMAIL = 'SET_TAG_BY_GMAIL'
// export const SET_GMAIL_ADDRESS = 'SET_GMAIL_ADDRESS'
// export const SET_CONVERSATIONS_GOOGLE = 'SET_CONVERSATIONS_GOOGLE'
// export const SET_IF_GMAIL_LABELS = 'SET_IF_GMAIL_LABELS'


// // export const addGmailTagMidd = ({ dispatch, getState }) => next => action => {
// //   if (action.type === ADD_GMAIL_TAG_SERVER) {
// //     $.ajax({
// //       url:
// //         'https://box.dev.leader.codes/api/' +
// //         getState().init.userName +
// //         '/tag/newGmailTag',
// //       type: 'POST',
// //       headers: { Authentication: getState().init.jwt },
// //       data: { tag: action.payload },
// //       success: function (data) {
// //         console.log('data.tag1 from middleware', data.tag1)
// //         dispatch({ type: GET_TAGS_SERVER, payload: data.tag1 })
// //       },
// //       error: function (err) {
// //         checkPermission(err).then(res => { })
// //       }
// //     })
// //   }
// //   return next(action)
// // }
// //box
// export const saveGoogeleTokenMidd = ({ dispatch, getState }) => next => action => {
//   if (action.type === SAVE_GOOGLE_TOKEN) {
//     //${action.payload}
//     fetch(`https://box.dev.leader.codes/api/google/saveGoogleToken`, {
//       method: 'POST',
//       headers: {
//         authorization:
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ5Y0Y2bjNnZ0tCTWVzaWdWbDhydG5jTmp1cDQzIiwiZW1haWwiOiJ0eml2eWE3OTFAZ21haWwuY29tIiwiaWF0IjoxNjEyMTY5OTY4fQ.HFpPNfiYq4fj2wdDf6nh6z_usZtwsqTkgsvv1fzHfvA'
//         //getState().init.jwt
//       }
//     })
//       .then(response => response.json())
//       .then(response => {
//         console.log(response.massage)
        
//           let win = window.open(
//           response.massage,
//           'urlaccaunt',
//           'width = 500, height =600,left = 375,top = 500'
//         )
//         setInterval(function () {
//         console.log('gf',win.location)
//           if (win.location.hostname === 'lobby.dev.leader.codes') {
//             win.close()
//             // dispatch({ type: SET_USER, payload: data.user })
//             //not related
//             // dispatch(actions.setTokenToString("true"))
//             return false
//           }
//         }, 80)
//       })
//   }
//   return next(action)
// }

// export const sendGmailMidd = ({ dispatch, getState }) => next => action => {
//   if (action.type === SEND_GMAIL) {
//     setTimeout(() => {
//       if (getState().notification.cancel === false) {
//         $.ajax({
//           url: 'https://api.dev.leader.codes/sendGmail',
//           type: 'POST',
//           data: JSON.stringify(action.payload),
//           contentType: "application/json",
//           headers: {
//             Authorization: getState().googleAuth.google_auth
//           },
//           success: function (data) {
//             console.log('data.sendGmail from middleware', data)
//             // dispatch({ type: SET_CONTACTS, payload: data.contacts })
//           },
//           error: function (err) {
//             console.log('error ' + err)
//             //show notification ERR in send mail
//             const notificationToShow = { info: allText['errorSendingEmail'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8',notUndo:true }
//             dispatch(setNotification(notificationToShow));
//           }
//         })
//       }
//       else {
//         console.log('cancel send mail');
//         dispatch({ type: UNDO_LAST_NOTIFICATION })
//       }
//     }, 3000);
//   }
//   return next(action)
// }
// export const getLabelsGmailMidd = ({ dispatch, getState }) => next => action => {
//   if (action.type === GET_LABELS_GMAIL_SERVER) {
//        const auth =  getState().googleAuth.google_auth

//       //  const auth = '{"access_token":"ya29.a0AfH6SMCrH_ZJzRZnyOKpQnHs8CiR0D7Wlhr9z51tY3Onm0SjGNhwDLRcVwQYuCJpTFuae5utC2N8U5PHDy_j-u9W0QI7-arfbMTuLjCZARYb54BKiW8oW5EAMZnXVkqG-NtQCUC2QAQFuOL5IJ3XAnn9fzbr","refresh_token":"1//0dlgz-4nP2O3cCgYIARAAGA0SNwF-L9IryXVxOeXQKWwrGrHw3H12Gy_kX6JhUvkTbAskvxl6cCuDI5skVJl62xc8TdUfB2I9kaU","scope":"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.email openid","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1MTQ1MTk2MDAzNjk2NzExODYiLCJoZCI6ImxlYWRlci5jb2RlcyIsImVtYWlsIjoibWFzdGVyQGxlYWRlci5jb2RlcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZVhGWThXQks5UXRJYlhlTmI3bENrdyIsImlhdCI6MTYxNjU3MTU5MywiZXhwIjoxNjE2NTc1MTkzfQ.bkq34riNiL9v47mCEe77v8fZiUPtGLki4Ek5msxql4Q0n8Vbe7zhWgm3L6d6EQX6xSZPFN31vtwXlh92l44Iw1Re7B_7x_hlw6HEvHxI0YKbIPgmWWEFaHdouPpRqnRGA4Ca779uquxhXxMtZfBrKpRYCa5pxqLOQlM9GLLRqb9v7kwY1XX8rqgrDtEFlGwP2akiPoZ5oFglUucjKD7qNmeAEAFqOgpBTnLtlAE0PwrgjURmGfmd7W3bGSjX-SFQZ0zp2Fx_aQG9TjhZqHisxO_kSFu1pN6-AJYYgmUZr4mtYM2ajtY1y3E_WBm_Bute9rWJ0j9Ou90PcRxDRAHQMg","expiry_date":1616575192098}'
//     console.log('auth ' + getState().googleAuth.google_auth)
//     $.ajax({
//       url: 'https://box.dev.leader.codes/api/' + getState().init.userName + '/tag/newGmailTag',
//       type: 'POST',
//       headers: {
//         Authorization: auth
//       },
//       success: async function (data) {
//         dispatch({ type: SET_TAG_BY_GMAIL, payload: data.resulteArr })
//       },
//       error: function (err) {
//         console.log('error ' + err)
//       }
//     })
//   }
//   return next(action)
// }
// export const gmailListMessagesMidd = ({ dispatch, getState }) => next => action => {

//   if (action.type === GET_MESSAGES_GMAIL_SERVER) {
//      const auth =  getState().googleAuth.google_auth

//     //const auth = '{"access_token":"ya29.a0AfH6SMCrH_ZJzRZnyOKpQnHs8CiR0D7Wlhr9z51tY3Onm0SjGNhwDLRcVwQYuCJpTFuae5utC2N8U5PHDy_j-u9W0QI7-arfbMTuLjCZARYb54BKiW8oW5EAMZnXVkqG-NtQCUC2QAQFuOL5IJ3XAnn9fzbr","refresh_token":"1//0dlgz-4nP2O3cCgYIARAAGA0SNwF-L9IryXVxOeXQKWwrGrHw3H12Gy_kX6JhUvkTbAskvxl6cCuDI5skVJl62xc8TdUfB2I9kaU","scope":"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.email openid","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1MTQ1MTk2MDAzNjk2NzExODYiLCJoZCI6ImxlYWRlci5jb2RlcyIsImVtYWlsIjoibWFzdGVyQGxlYWRlci5jb2RlcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZVhGWThXQks5UXRJYlhlTmI3bENrdyIsImlhdCI6MTYxNjU3MTU5MywiZXhwIjoxNjE2NTc1MTkzfQ.bkq34riNiL9v47mCEe77v8fZiUPtGLki4Ek5msxql4Q0n8Vbe7zhWgm3L6d6EQX6xSZPFN31vtwXlh92l44Iw1Re7B_7x_hlw6HEvHxI0YKbIPgmWWEFaHdouPpRqnRGA4Ca779uquxhXxMtZfBrKpRYCa5pxqLOQlM9GLLRqb9v7kwY1XX8rqgrDtEFlGwP2akiPoZ5oFglUucjKD7qNmeAEAFqOgpBTnLtlAE0PwrgjURmGfmd7W3bGSjX-SFQZ0zp2Fx_aQG9TjhZqHisxO_kSFu1pN6-AJYYgmUZr4mtYM2ajtY1y3E_WBm_Bute9rWJ0j9Ou90PcRxDRAHQMg","expiry_date":1616575192098}'
//     console.log('auth ' + getState().googleAuth.google_auth)
//        $.ajax({
//         url: 'https://box.dev.leader.codes/api/' + getState().init.userName + '/google/gmailMassage',
//        type: 'POST',
//       // data: JSON.stringify({ query: 'in:inbox' }),
//       contentType: "application/json",
//       headers: {
//         Authorization: auth
//       },
//       success: function (data) {
//         console.log('data.google maasage from middleware', data)
//         dispatch({ type: SET_CONVERSATIONS_GOOGLE, payload: data })

//         // dispatch({ type: SET_CONTACTS, payload: data.contacts })
//       },
//       error: function (err) {
//         console.log('error ' + err)
//       }
//     })
//   }
//   return next(action)
// }
// export const getGmailAddressMidd = ({ dispatch, getState }) => next => action => {
//   if (action.type === GET_GMAIL_ADDRESS_SERVER) {
//     console.log('auth ' + getState().googleAuth.google_auth)
//      // const auth = '{"access_token":"ya29.a0AfH6SMCrH_ZJzRZnyOKpQnHs8CiR0D7Wlhr9z51tY3Onm0SjGNhwDLRcVwQYuCJpTFuae5utC2N8U5PHDy_j-u9W0QI7-arfbMTuLjCZARYb54BKiW8oW5EAMZnXVkqG-NtQCUC2QAQFuOL5IJ3XAnn9fzbr","refresh_token":"1//0dlgz-4nP2O3cCgYIARAAGA0SNwF-L9IryXVxOeXQKWwrGrHw3H12Gy_kX6JhUvkTbAskvxl6cCuDI5skVJl62xc8TdUfB2I9kaU","scope":"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.email openid","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1MTQ1MTk2MDAzNjk2NzExODYiLCJoZCI6ImxlYWRlci5jb2RlcyIsImVtYWlsIjoibWFzdGVyQGxlYWRlci5jb2RlcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZVhGWThXQks5UXRJYlhlTmI3bENrdyIsImlhdCI6MTYxNjU3MTU5MywiZXhwIjoxNjE2NTc1MTkzfQ.bkq34riNiL9v47mCEe77v8fZiUPtGLki4Ek5msxql4Q0n8Vbe7zhWgm3L6d6EQX6xSZPFN31vtwXlh92l44Iw1Re7B_7x_hlw6HEvHxI0YKbIPgmWWEFaHdouPpRqnRGA4Ca779uquxhXxMtZfBrKpRYCa5pxqLOQlM9GLLRqb9v7kwY1XX8rqgrDtEFlGwP2akiPoZ5oFglUucjKD7qNmeAEAFqOgpBTnLtlAE0PwrgjURmGfmd7W3bGSjX-SFQZ0zp2Fx_aQG9TjhZqHisxO_kSFu1pN6-AJYYgmUZr4mtYM2ajtY1y3E_WBm_Bute9rWJ0j9Ou90PcRxDRAHQMg","expiry_date":1616575192098}'
//  const auth =  getState().googleAuth.google_auth
//     $.ajax({
//       url:
//         'https://box.dev.leader.codes/api/' +
//         getState().init.userName +
//         '/google/getGmailAddress',
//       type: 'GET',
//       headers: {
//         Authorization:auth
//       },
//       success: async function (data) {
//         dispatch({ type: SET_GMAIL_ADDRESS, payload: data })
//       },
//       error: function (err) {
//         console.log('error ' + err)
//       }
//     })
//   }
//   return next(action)
// }
// export const getIfGmailLabelsMidd = ({ dispatch, getState }) => next => action => {
//   if (action.type === GET_IF_GMAIL_LABELS_SERVER) {
//       $.ajax({
//       url:'https://box.dev.leader.codes/api/' +getState().init.userName + '/google/ifLabelsGmail',
//       type: 'GET',
//       headers: {
//         Authorization: getState().init.jwt

//       },
//       success: async function (data) {
//         console.log('data fro if labels gmail ',data)
//         dispatch({ type: SET_IF_GMAIL_LABELS, payload: data })
//       },
//       error: function (err) {
//         console.log('error ' + err)
//       }
//     })
//   }
//   return next(action)
// }
