// import { SET_SELECTED_SUB_USERS, SET_USER_TYPE, SET_MAIL_CHANELLS } from '../actions/subUsers.actions';
// import {
//   SET_SUB_USERS,
//   SUB_USER,
//   DELETE_SUB_USER,
// } from "../middleware/subUsers.crud";

import produce from "immer";
import createReducer from "./reducerUtils";
import subUser from "../../components/from-Email/subUsers/subUser";
// import { deleteSubUser, setMailChannels } from "../actions/subUsers.actions";

const initialState = {
  subUsers: [],
  selectedSubUser: window.location.pathname.split('/')[1],
  type: "",
  mailChannels: [],
};
const subUsersReducer = {
  setSubUsers(state, action) {
    state.subUsers = action.payload;
  },
  subUser(state, action) {
    state.subUsers.push(action.payload);
  },
  setSelectedSubUser(state, action) {
    state.selectedSubUser = action.payload;
  },
  setUserType(state, action) {
    state.type = action.payload;
  },
  deleteSubUser(state, action) {
    state.subUsers = state.subUsers.filter((s) => s.username != action.payload);
  },
  setMailChannels(state, action) {
    state.mailChannels = action.payload;
  },
};

export default produce(
  (state, action) => createReducer(state, action, subUsersReducer),
  initialState
);
