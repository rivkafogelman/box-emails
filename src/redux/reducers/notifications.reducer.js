import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    allNotifications: [],
    user: 'lea',
    token: ''
}
const notification = {
    setAllNotifications(state, action) {
        state.allNotifications= action.payload;
    },
    setUser(state, action) { 
        state.user = action.payload;
    },
    setToken(state, action) {
        state.token = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, notification), initialState);
