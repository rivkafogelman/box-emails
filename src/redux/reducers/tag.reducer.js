// import {
//   SET_DISPLAY_TAGS,
//   UPDATE_TAGS_IDS_TO_EDIT,
//   SET_SELECTED_COLOR
// } from '../actions/tag.actions'
import {
  SET_TAGS,
  ADD_TAG,
  DELETE_TAG,
  EDIT_TAG,
} from "../middleware/tags.crud";
import { SET_TAG_BY_GMAIL } from "../middleware/googleAuth.crud";
import { keyBy } from "lodash";
import produce from "immer";
import createReducer from "./reducerUtils";
import { setSelectedColor } from "../actions/tag.actions";
// import { deleteTag } from '../actions/tag.actions';

const initialState = {
  tags: [
    {
      _id: "60e3fa311a408d913fd0ec95",
      title: "service",
      color: "rgb(248, 140, 32)",
    },
    {
      _id: "60e3fa651a408d913fd0edbe",
      title: "sales",
      color: "rgb(44, 141, 120)",
    },
    {
      _id: "60e3f9271a408d913fd0e622",
      title: "personal",
      color: "rgb(133, 128, 253)",
    },
  ],
  displayTags: false,
  tagsIdsToEdit: [],
  selectedColor: false,
  gmailAddress: "shosh@",
};
let tag;
const tagsReducer = {
  setTags(state, action) {
  const arr =state.tags.slice(0,3);
  state.tags = arr.concat(action.payload);
  },
  setTagByGmail(state, action) {
    state.tags = action.payload;
  },
  addTag(state, action) {
    state.tags.push(action.payload);
  },
  setDisplayTags(state, action) {
    state.displayTags = action.payload;
  },
  deleteTag(state, action) {
    let ind = state.tags.findIndex((t) => t._id === action.payload);
    if (ind !== -1) {
      state.tags.splice(ind, 1);
    }
  },
  editTag(state, action) {
    tag = state.tags.find((t) => t._id === action.payload._id);
    tag.color = action.payload.color;
    tag.title = action.payload.title;
  },
  updateTagsIdsToEdit(state, action) {
    switch (action.payload.toDo) {
      case "checkAll":
        state.tagsIdsToEdit = [];
        state.tags.forEach((t) => {
          state.tagsIdsToEdit.push(t);
        });
        break;
      case "unCheckAll":
        state.tagsIdsToEdit = [];
        break;
      case "add":
        state.tagsIdsToEdit.push(action.payload.id);
        break;
      case "remove":
        let ind = state.tagsIdsToEdit.findIndex(
          (t) => t._id === action.payload.id
        );
        if (ind !== -1) {
          state.tagsIdsToEdit.splice(ind, 1);
        }
        break;
      default:
        break;
    }
  },
  setSelectedColor(state, action) {
    state.selectedColor = action.payload;
  },
  // return { ...state, conversations: keyBy(action.payload, (c) => { c._id }) }
  // case GET_TAGS:
  //     return { ...state, conversations: keyBy(action.payload, (c) => { c._id }) }
};
export default produce(
  (state, action) => createReducer(state, action, tagsReducer),
  initialState
);
