export const ADD_CONTACT_TO_SPAM = 'ADD_CONTACT_TO_SPAM'
export const REMOVE_SPAM_CONVERSATION = 'REMOVE_SPAM_CONVERSATION'

export function addSpam(sp) {

    return {
        type: ADD_CONTACT_TO_SPAM,
        payload: sp
    }
}
export function removeSpam(sp) {
     
   return {
       type: REMOVE_SPAM_CONVERSATION,
       payload: sp
   }
}