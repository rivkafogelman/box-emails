// import { SET_GROUPS, ADD_GROUP, DELETE_GROUP, UPDATE_GROUP } from '../middleware/group.crud'
// import { SET_SHOW, SET_CURRENT_GROUP, SET_CONTACT_ID_NEW_GROUP, REMOVE_CONTACT_ID_NEW_GROUP } from "../actions/group.actions";
import produce from 'immer'
import { deleteGroup } from '../actions/group.actions';
// import { addConversationIdToEdit } from '../actions/conversation.actions';
import createReducer from "./reducerUtils";

const initialState = {
    groups: [],
    currentGroup: null,
    show: false,
    contactsIdNewGroup: []
}

const groupsReducer = {
    setGroups(state, action) {
        state.groups = action.payload.groups
    },
    addGroup(state, action) {
        state.groups = state.groups.concat(action.payload.group)
    },
    deleteGroup(state, action) {
        state.groups.splice(state.groups.findIndex((t => t.groupName === action.payload.groupName)), 1)
    },
    setShow(state, action) {
        state.show = action.payload
    },
    setCurrentGroup(state, action) {
        state.currentGroup = action.payload
    },
    updateGroup(state, action) {
        let index = state.groups.findIndex(t => t.groupName === action.payload.oldGroupName)
        state.groups[index].members = action.payload.group.members;
        state.groups[index].groupName = action.payload.group.groupName
    },
    setContacstIdNewGroup(state, action) {
        state.contactsIdNewGroup = state.contactsIdNewGroup.concat(action.payload)
    },
    removeContactIdNewGroup(state, action) {
        if (action.payload == "all")
            state.contactsIdNewGroup = []
        else
            state.contactsIdNewGroup = state.contactsIdNewGroup.filter(c => c !== action.payload)
    },

}
export default produce((state, action) => createReducer(state, action, groupsReducer), initialState);