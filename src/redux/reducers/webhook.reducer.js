// import {SET_JSON_PARSER_FORM,
//     SET_SHOW_ALL, SET_FILTERED_BODY,
//     SET_WEBHOOK_SELECTED_PROPS,
//     SET_SECOND_RENDER,
//     SET_WEBHOOK_FLAG
// }
//     from '../actions/webhook.actions'

import produce from "immer";
import {
  setSecondRender,
  setShowAll,
  setWebhookSelectedProps,
} from "../actions/webhook.actions";
import createReducer from "./reducerUtils";
// SET_SOURCE_IP

const initialState = {
  selectedProps: null,
  setCloseJsonParser: false,
  isShowAll: false,
  filteredBody: "",
  webhookFlag: false,
  secondRender: false,
};

const webhookReducer = {
  setWebhookSelectedProps(state, action) {
    state.selectedProps = action.payload;
  },
  setJsonParserForm(state, action) {
    state.setCloseJsonParser = action.payload;
  },
  setShowAll(state, action) {
    state.isShowAll = action.payload;
  },
  setFilteredBody(state, action) {
    state.filteredBody = action.payload;
  },
  setWebhookFlag(state, action) {
    state.webhookFlag = action.payload;
  },
  setSecondRender(state, action) {
    state.secondRender = action.payload;
  },
};

export default produce(
  (state, action) => createReducer(state, action, webhookReducer),
  initialState
);
