import { ADD_CONTACT_TO_SPAM } from '../actions/spam.actions';
import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
    id: ""
}
const spamReducer = {
            addSpam(state, action){
                state.id = action.payload
            },
            removeSpam(state, action){
                state.id = action.payload
            }
}

export default produce((state, action) => createReducer(state, action, spamReducer), initialState);