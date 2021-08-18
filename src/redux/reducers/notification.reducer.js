import produce from 'immer'
// import { SET_NOTIFICATION, UNDO_LAST_NOTIFICATION } from '../actions/notification.actions';
import createReducer from "./reducerUtils";

const initialState = {
    currentNotification: null,
    cancel:false
}

const notificationReducer = {

    setNotification(state, action) {
        state.currentNotification = action.payload
    },  
    undoLastNotification(state, action) {
        state.cancel=!state.cancel;
    },  
}

export default produce((state, action) => createReducer(state, action, notificationReducer), initialState);
