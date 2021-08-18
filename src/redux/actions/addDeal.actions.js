export const ADD_DEAL_SERVER = 'ADD_DEAL_SERVER'
export const SET_DISPLAY_DEAL = 'SET_DISPLAY_DEAL'

export function addDeal(deal) {
    console.log("action create deal!!!!!!!")
     
    return {
        type: ADD_DEAL_SERVER,
        payload: deal
    }
}

// export function setDisplayDeal(bool) {
//     return {
//         type: SET_DISPLAY_DEAL,
//         payload: bool
//     }
// }