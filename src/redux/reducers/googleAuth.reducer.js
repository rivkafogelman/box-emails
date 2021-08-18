// import { SET_TAGS, ADD_TAG } from '../middleware/tags.crud'
// import { ADD_GMAIL_TAG, SET_GMAIL_ADDRESS,SET_CONVERSATIONS_GOOGLE ,SET_IF_GMAIL_LABELS} from '../middleware/googleAuth.crud'
// import produce from 'immer'
// export const initialState = {
//     google_auth:decodeURIComponent(document.cookie && document.cookie.includes('googleToken')? document.cookie.split(';').filter(s => s.includes('googleToken'))[0].split('=').pop(): null),

//     // decodeURIComponent(document.cookie.split(";").filter(s => s.includes('googleToken'))[0] ? document.cookie.split(";").filter(s => s.includes('googleToken'))[0].split("=").pop() :null),
//    // decodeURIComponent(document.cookie && document.cookie.includes('googleToken')? document.cookie.split(';').filter(s => s.includes('googleToken'))[0].split('=').pop(): null),
//     ifGmailLabels: false,
//   //google_auth:'{"access_token":"ya29.a0AfH6SMCrH_ZJzRZnyOKpQnHs8CiR0D7Wlhr9z51tY3Onm0SjGNhwDLRcVwQYuCJpTFuae5utC2N8U5PHDy_j-u9W0QI7-arfbMTuLjCZARYb54BKiW8oW5EAMZnXVkqG-NtQCUC2QAQFuOL5IJ3XAnn9fzbr","refresh_token":"1//0dlgz-4nP2O3cCgYIARAAGA0SNwF-L9IryXVxOeXQKWwrGrHw3H12Gy_kX6JhUvkTbAskvxl6cCuDI5skVJl62xc8TdUfB2I9kaU","scope":"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.email openid","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1MTQ1MTk2MDAzNjk2NzExODYiLCJoZCI6ImxlYWRlci5jb2RlcyIsImVtYWlsIjoibWFzdGVyQGxlYWRlci5jb2RlcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZVhGWThXQks5UXRJYlhlTmI3bENrdyIsImlhdCI6MTYxNjU3MTU5MywiZXhwIjoxNjE2NTc1MTkzfQ.bkq34riNiL9v47mCEe77v8fZiUPtGLki4Ek5msxql4Q0n8Vbe7zhWgm3L6d6EQX6xSZPFN31vtwXlh92l44Iw1Re7B_7x_hlw6HEvHxI0YKbIPgmWWEFaHdouPpRqnRGA4Ca779uquxhXxMtZfBrKpRYCa5pxqLOQlM9GLLRqb9v7kwY1XX8rqgrDtEFlGwP2akiPoZ5oFglUucjKD7qNmeAEAFqOgpBTnLtlAE0PwrgjURmGfmd7W3bGSjX-SFQZ0zp2Fx_aQG9TjhZqHisxO_kSFu1pN6-AJYYgmUZr4mtYM2ajtY1y3E_WBm_Bute9rWJ0j9Ou90PcRxDRAHQMg","expiry_date":1616575192098}'
//     //'{"access_token":"ya29.a0AfH6SMDWfuRFQerNKaZQlS6gAMNYX2QDoxhmeYiCbbJIBfngR4sz7dujrYYrtsQZupRfCdHExaUEGcMzszB-mFbvsMxS29q65rXtC-88X9UoNEfLbZBQW4SBw6arDY4cXKzF27drNObV5N1ImDVdGGy2_nD1","refresh_token":"1//0dvn9Y6bjT9VeCgYIARAAGA0SNwF-L9Irj-6xOcAgjVPW2l_0rhugKyO97rpxi-siS7JfPu9E2UGk_BJrLI74HTpP8w3yuqGddbg","scope":"https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/calendar openid https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.readonly","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0NjJhNzFkYTRmNmQ2MTFmYzBmZWNmMGZjNGJhOWMzN2Q2NWU2Y2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTgyOTcwNjM2NDAtc2xyZWo5YTg5Z29laGtoZTVwMTBlajBqdGh2N2ZwdDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE2ODA0MDYzNzA5ODQ5MTM5OTEiLCJlbWFpbCI6Im5ldW1hbnBpY0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlB5bkpNWXlud3V0Y1JkMjBST0F2X3ciLCJpYXQiOjE2MTU3OTQ2NjAsImV4cCI6MTYxNTc5ODI2MH0.DLkr4f-0nawMbWEWTNdS2LtQJRK12vOCT_VwOHAQnN9ajpMNBqcYfXi7rtVjQ3TLtbKJ4bz6NX0LMuFZlZWEjHUkHqKU3kT0LNQqSeB2fnnc7X-c0PVeVdkqbf5fQ4hOjRHd3lTY4m1i4gt2aK_Gfybus6NddDDaaPaBVs0VOCFQ9Q3cWlf8H7LKrZPxxVMiq4rdbEvqw2s28997G17_49n8MoOkgQ12-ZruVGYSoIUXi8G8Ryl_qVijIJSmwifSX50qGbrjy1FGXECReLBtnA01tnanM3Ta4DuxGz48KG7EbMbBqHlZrAmgKjDq8Qi3dVoawZmFPNtk129Xj25Z4g","expiry_date":1615798259217}',
// }

// const googleAuthReducer = produce((state, action) => {
//   switch (action.type) {
//     case ADD_TAG:
//       state.tags.push(action.payload)
//       break
//     case ADD_GMAIL_TAG:
//       state.tags.push(action.payload)
//       break
//     case SET_TAGS:
//       state.tags = action.payload
//       break
//     case SET_GMAIL_ADDRESS:
//       state.gmailUserAddress = action.payload
//       break
//     case SET_IF_GMAIL_LABELS:
//        state.ifGmailLabels = action.payload
//            break
//     default:
//       return state
//   }
// }, initialState)

// export default googleAuthReducer
