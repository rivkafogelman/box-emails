export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const UNDO_LAST_NOTIFICATION = 'UNDO_LAST_NOTIFICATION'


export function setNotification(notification) {
    return {
        type: SET_NOTIFICATION,
        payload:notification
    }
}

