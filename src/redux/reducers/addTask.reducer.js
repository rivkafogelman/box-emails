import produce from 'immer'
// import { SET_DISPLAY_TASK } from '../actions/addTask.actions'
import createReducer from "./reducerUtils";

const initialState = {
    displayAddTaskCard: false,
}

const addTaskReducer = {

    setDisplayTask(state, action) {
        state.displayAddTaskCard = action.payload
    },  

}

export default produce((state, action) => createReducer(state, action, addTaskReducer), initialState);
