export const SET_SHOW_OPEN_CONVERSATION = '[displaySettings]SET_SHOW_OPEN_CONVERSATION'

export function setShowOpenConversation(bool) {
    return {
        type: SET_SHOW_OPEN_CONVERSATION,
        payload: bool
    }
}
