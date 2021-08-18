import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    displayAddDealCard: false,
}
const addDealReducer = {

    setDisplayDeal(state, action) {
        state.displayAddDealCard = action.payload;
    },  

}

export default produce((state, action) => createReducer(state, action, addDealReducer), initialState);

