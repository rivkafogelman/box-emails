export const ADD_LEAD_SERVER = 'ADD_LEAD_SERVER'
export const SET_DISPLAY_LEAD = 'SET_DISPLAY_LEAD'
export const ADD_CONTACT_SERVER = 'ADD_CONTACT_SERVER'

export function addLeadServer(lead) {
     
    return {
        type: ADD_LEAD_SERVER,
        payload: lead
    }
}

export function addContactServer(contact, group, newGroup) {
     
    return {
        type: ADD_CONTACT_SERVER,
        payload: {
            contact: contact,
            group: group,
            newGroup: newGroup
        }
    }
}
// export function setDisplayLead(bool) {
//     return {
//         type: SET_DISPLAY_LEAD,
//         payload: bool
//     }
// }