
// let userName = window.location.pathname.split('/')[1]
// const jwt = document.cookie.split(";").filter(s => s.includes('jwt'))[0] ? document.cookie.split(";").filter(s => s.includes('jwt'))[0].split("=").pop() : ""

// class webhookService {
//     getAllWebhooks = () => {
//         return fetch('https://webhook.leader.codes/getWebhooksByUser/' + userName, {
//             method: "GET"
//         }).then(res => {
//             return res.json()
//         }).then((result) => {
//             //   
//             // console.log('webhooks: ' + result)
//             return result.webhooks
//         }, (error) => {
//             console.log(error)
//             return error.message
//         })
//     }
//     toggleBlock = (Sip) => {
//         return fetch('https://webhook.leader.codes/toggleBlock/' + userName + '/' + Sip,
//             {
//                 method: "POST"
//                 // headers: {
//                 //     'content-Type': "application/json"
//                 // },
//                 // body: JSON.stringify({ "blocked": blocked })
//             }
//         ).then(res => {
//             return res.json()
//         }).then((result) => {
//             //   
//             // console.log('blocked: ' + result.blocked)
//             return result.blocked
//         }, (error) => {
//             console.log(error)
//             return error.message
//         })
//     }
//     updateNickname = (Sip, nickname) => {
//         console.log(nickname)
//         return fetch('https://webhook.leader.codes/updateNickname/' + userName + '/' + Sip ,
//             {
//                 method: "POST",
//                 headers: {
//                     'content-Type': "application/json"
//                 },
//                 body: JSON.stringify({ "nickname": nickname })
//             }).then(res => {
//                 return res.json()
//             }).then((result) => {
                  
//                 console.log('nickname: ' + result.nickname)
//                 return result.nickname
//             }, (error) => {
//                 console.log(error)
//                 return error.message
//             })
//     }
// }

// export default new webhookService()