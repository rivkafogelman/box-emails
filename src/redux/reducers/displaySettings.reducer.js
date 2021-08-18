import produce from 'immer'
// import { SET_SHOW_OPEN_CONVERSATION } from '../actions/displaySettings.actions'
import createReducer from "./reducerUtils";

const initialState = {
    showOpenConversation: false,
}

const displaySettingsReducer = {

    setShowOpenConversation(state, action) {
        state.showOpenConversation = action.payload
    },  

}

export default produce((state, action) => createReducer(state, action, displaySettingsReducer), initialState);

