import produce from "immer";
import createReducer from "./reducerUtils";
// import { SET_TEMPLATES_LIST, SET_CURRENT_TEMPLATE } from '../actions/templates.actions';
const initialState = {
  templatesList: null,
  currentTemplate: null,
};
const templatesReducer = {
  setTemplatesList(state, action) {
    state.templatesList = action.payload;
    console.log("action.payload", action.payload);
  },
  setCurrentTemplate(state, action) {
    state.currentTemplate = action.payload;
  },
};
export default produce(
  (state, action) => createReducer(state, action, templatesReducer),
  initialState
);
