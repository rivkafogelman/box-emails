export const ADD_MEET_SERVER = 'ADD_MEET_SERVER'
export const SET_DISPLAY_MEET = 'SET_DISPLAY_MEET'

export function addMeet(meet) {
     
    return {
        type: ADD_MEET_SERVER,
        payload: meet
    }
}

// export function setDisplayMeet(bool) {
     
//     return {
//         type: SET_DISPLAY_MEET,
//         payload: bool
//     }
// }