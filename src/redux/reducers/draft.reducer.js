// import { SET_DRAFTS, ADD_DRAFT, DELETE_DRAFT } from '../middleware/drafts.crud'
// import { ADD_NEW_MESSAGE_CARD, REMOVE_NEW_MESSAGE_CARD, EXPAND_MESSAGE, MINIMIZE_MESSAGE } from '../actions/draft.actions'
// import { EDIT_DRAFT } from '../actions/draft.actions'
import conversationReducer from './conversation.reducer'
import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    drafts: [],
    newMessagesCards: [],
    newMessagesCardsCounter: 0
}
let draft;
let ind;
let myMessage

const draftsReducer = {

    setDrafts(state, action) {
        state.drafts = action.payload
    },
    addDraft(state, action) {
        state.drafts.push(action.payload.draft)
        myMessage = state.newMessagesCards.find(mc => mc.messageId === action.payload.messageId)
        if (myMessage) {
            myMessage.draft = action.payload.draft
        }
    },
    deleteDraft(state, action) {
        ind = state.drafts.findIndex((d => d._id === action.payload))
        if (ind !== -1) {
            state.drafts.splice(ind, 1)
        }
    },
    editDraft(state, action) {
        console.log("EDIT_DRAFT,action.payload", action.payload)
        draft = state.drafts.find(d => d._id === action.payload._id);
        if (!draft) {
            console.log('edit draft reducer draft doesnt found;');
            return;
        }
        draft.subject = action.payload.subject
        draft.to = action.payload.to
        draft.readed = action.payload.readed
        draft.starred = action.payload.starred
        draft.archived = action.payload.archived
        draft.body = action.payload.body
        draft.templateId=action.payload.templateId
        draft.files = action.payload.files
        let nmcDrft = state.newMessagesCards.find(mc => mc.draft&&mc.draft._id === action.payload._id)
        if (nmcDrft) {
            nmcDrft.draft.subject = action.payload.subject
            nmcDrft.draft.to = action.payload.to
            nmcDrft.draft.readed = action.payload.readed
            nmcDrft.draft.starred = action.payload.starred
            nmcDrft.draft.archived = action.payload.archived
            nmcDrft.draft.body = action.payload.body
            nmcDrft.draft.templateId=action.payload.templateId
            nmcDrft.draft.files = action.payload.files
        }
    },
    addNewMessageCard(state, action) {
        let toPush = { "messageId": state.newMessagesCardsCounter++, "draft": action.payload ? action.payload : null, "expand": false, "minimize": false }
        state.newMessagesCards.push(toPush)
    },
    removeNewMessageCard(state, action) {
        ind = state.newMessagesCards.findIndex(c => c.messageId === action.payload.id)
        state.newMessagesCards.splice(ind, 1)
    },
    expandMessage(state, action) {
        let length = state.newMessagesCards.length;
        ind = state.newMessagesCards.findIndex(c => c.messageId === action.payload.id)
        let mTe = state.newMessagesCards.find(m => m.messageId === action.payload.id)
        mTe.expand = action.payload.expand;
        if (action.payload.expand)
            if (length > 1 && action.payload.from) {
                if (ind === length - 1) {
                    state.newMessagesCards[length - 2].expand = false
                    state.newMessagesCards[length - 2].minimize = true
                }
                else {
                    state.newMessagesCards[length - 1].expand = false
                    state.newMessagesCards[length - 1].minimize = true

                }
            }
    },
    minimizeMessage(state, action) {
        debugger
        let mTm = state.newMessagesCards.find(m => m.messageId === action.payload.id)
        mTm.minimize = action.payload.minimize;
    }

}

export default produce((state, action) => createReducer(state, action, draftsReducer), initialState);
