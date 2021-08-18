import produce from 'immer'
import createReducer from "./reducerUtils";

// import { SET_DISPLAY_MEET} from '../actions/addMeeting.actions';

const initialState = {
    displayAddMeet: false,
}
const addMeetReducer = {

    setDisplayMeet(state, action) {
        state.displayAddMeet = action.payload
    },  

}

export default produce((state, action) => createReducer(state, action, addMeetReducer), initialState);