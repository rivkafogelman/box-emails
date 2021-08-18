import produce from 'immer'
// import { SET_DISPLAY_LEAD, ADD_LEAD_SERVER } from '../actions/lead.actions';
import createReducer from "./reducerUtils";

const initialState = {
    displayAddLeadCard: false,
}

const leadReducer = {

    setDisplayLead(state, action) {
        state.displayAddLeadCard = action.payload
    },  

}

export default produce((state, action) => createReducer(state, action, leadReducer), initialState);
