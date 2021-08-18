
// import $, { error } from "jquery";


// export const getUserFromMiddleware = ({ dispatch, getState }) => next => action => {
    
//     if (action.type === 'GET_USER') {
//         console.log(":dsvvs");
//         $.ajax({
//             url: "https://box.dev.leader.codes/api/getUser/" + getState().init.userName,
//             type: 'GET',
//             success: function (data) {

//                 console.log("data.user from middleware", data.user);
//                 let user = data.user;
//                 dispatch({ type: 'SET_USER', payload: user })

               
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     }
//     return next(action)
// }



// export const getFromServer = ({ dispatch, getState }) => next => action => {
//     if (action.type === 'GET_JSON')
//         $.ajax({
//             url: 'https://randomuser.me/api/?results=10&seed=abc',
//             type: 'GET',
//             success: function (data) {
//                 console.log(data);
//             }
//         })
//     return next(action)
// }
// export const creatFunnel = ({ dispatch, getState }) => next => action => {
//     if (action.type === '[funnel] CREAT_FUNNEL') {
//         console.log(getState().funnel.jsonPage);
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/${getState().user.userId}`,
//             type: 'POST',
//             data: { 'name': getState().funnel.name, json: JSON.stringify(getState().funnel.jsonPage) },
//             success: function (data) {
//                 console.log(data);
//             },
//             error: function (err) {
//                 console.log();
//                 alert(JSON.parse(err.responseText).message)
//             }
//         })
//     }
//     return next(action)

// }
// export const updateFunnel = ({ dispatch, getState }) => next => action => {
//     if (action.type === '[funnel] UPDATE_FUNNEL') {
//         console.log(getState().funnel.jsonPage);
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/updateFunnel/${getState().user.userId}/${getState().funnel.idFunnel}`,
//             type: 'POST',
//             data: { name: getState().funnel.name, json: JSON.stringify(getState().funnel.jsonPage) },
//             success: function (data) {
//                 console.log(data);
//             },
//             error: function (err) {
//                 console.log();
//                 alert(JSON.parse(err.responseText).message)
//             }
//         })
//     }
//     return next(action)
// }
// export const getAllFunnelByUserId = ({ dispatch, getState }) => next => action => {
//     if (action.type === '[funnel] GET_ALL_FUNNELS') {
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/${getState().user.userId}`,
//             type: 'GET',
//             success: function (data) {
//                 console.log(data);
//                 dispatch({ type: '[funnel] SET_ALL_FUNNELS', payload: data.result })
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     }
//     return next(action)
// }
// export const getUidByUserName = ({ dispatch, getState }) => next => action => {
//     if (action.type === '[user] GET_UID_BY_USER_NAME') {
//         // let url = window.location;
//         // let userName = url.pathname.split('/')[1]
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/getuser/${getState().user.userName}`,
//             type: 'GET',
//             success: function (data) {
//                 console.log(data);
//                 let newUid = data.uid;
//                 dispatch({ type: '[user] SET_USER_ID', payload: newUid })
//                 if (getState().funnel.name !== 'new')
//                     dispatch({ type: '[user] GET_FUNNEL', payload: newUid })

//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     }
//     return next(action)

// }
// export const getFunnelByName = ({ dispatch, getState }) => next => action => {

//     if (action.type === '[user] GET_FUNNEL') {
//         const uid = getState().user.userId ? getState().user.userId : action.payload
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/${uid}/${getState().funnel.name}`,
//             type: 'GET',
//             success: function (data) {
//                 console.log(data);
//                 if (data.result) {
//                     console.log(JSON.parse(data.result.json));
//                     console.log(data.result._id);
//                     dispatch({ type: '[funnel] SET_ID_FUNNEL', payload: data.result._id })
//                     dispatch({ type: '[funnel] SET_JSON_PAGE', payload: JSON.parse(data.result.json) })
//                 }
//                 else {
//                     alert('Page not found')
//                     window.location.href = `http://localhost:3000/${getState().user.userName}/new`
//                 }
//             },
//             error: function (err) {
//                 console.log(err);

//             }
//         })
//     }
//     return next(action)

// }
// export const removeFunnel = ({ dispatch, getState }) => next => action => {

//     if (action.type === '[funnel] REMOVE_FUNNEL') {
//         $.ajax({
//             url: `https://funnel.dev.leader.codes/api/removeFunnel/${action.payload}`,
//             type: 'DELETE',
//             success: function (data) {
//                 console.log(data);
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     }
//     return next(action)
// }
// export const uploadFile = ({ dispatch, getState }) => next => action => {
//     return new Promise((resolve, reject) => {
//         if (action.type === '[funnel] UPLOAD_FILE') {
//             const fil = action.payload
//             console.log(fil);
//             const myFile = new FormData()
//             myFile.append("file", action.payload)
//             $.ajax({
//                 url: `https://funnel.dev.leader.codes/api/uploadFile/${getState().user.userId}`,
//                 type: 'POST',
//                 data: myFile,
//                 contentType: false,
//                 processData: false,
//                 headers: {
//                     Authorization: 'view'
//                 },
//                 success: function (data) {
//                     console.log(data);
//                     dispatch({ type: '[funnel] SET_IMAGE_FILE', payload: data })
//                     resolve(data)
//                 },
//                 error: function (err) {
//                     console.log(err);
//                     reject(err)
//                 }
//             })
//         }
//         return next(action)
//     })
// }
// export const uploadImage = ({ dispatch, getState }) => next => action => {
//     return new Promise((resolve, reject) => {
//     if (action.type === '[funnel] UPLOAD_IMAGE')
//     console.log(action.payload.get('file'))
//     $.ajax({
//         type: "POST",
//         url: "https://files.leader.codes/api/" + "WzM020nw4TgcAo1XIyl94g0Z0152" + "/upload",
//         headers:  {
//             Authorization: 'view'
//           },

//         data: action.payload,
//         processData: false,
//         contentType: false,
//         success: function (data) {
//             console.log(data);
//             // return data.data.url
//             resolve(data.data.url)
//         },
//         error: function (err) {
//             alert(err);
//             // return false
//             resolve(false)
//         },

//     });

//         return next(action)
// })
// }


