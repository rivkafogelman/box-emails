import conversationService from '../../services/conversation.service'

export const GET_CONVERSATIONS_SERVER = 'GET_CONVERSATIONS_SERVER'
export const GET_SYSTEM_WAVES_SERVER = 'GET_SYSTEM_WAVES_SERVER'
export const EDIT_CONVERSATION_SERVER = 'EDIT_CONVERSATION_SERVER'
export const EDIT_CONVERSATIONS_SERVER = 'EDIT_CONVERSATIONS_SERVER'
export const EDIT_CONVERSATIONST_SERVER = 'EDIT_CONVERSATIONST_SERVER'
export const DELETE_CONVERSATIONS_SERVER = 'DELETE_CONVERSATIONS_SERVER'
export const DELETE_SYSTEM_WAVES_SERVER = 'DELETE_SYSTEM_WAVES_SERVER'
export const DELETE_CONVERSATION_SERVER = 'DELETE_CONVERSATION_SERVER'
export const ADD_CONVERSATION_SERVER = 'ADD_CONVERSATION_SERVER'
export const UPLOAD_FILES_SERVER = 'UPLOAD_FILES_SERVER'
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS'
export const DOWNLOAD_FILE_SERVER = 'DOWNLOAD_FILE_SERVER'
export const CREATE_SYSTEM_WAVE = 'CREATE_SYSTEM_WAVE'
export const ADD_WAVE_SERVER = 'ADD_WAVE_SERVER'
export const SET_EMAIL_FROM_MASSAGE = 'SET_EMAIL_FROM_MASSAGE'
export const SET_SELECTED_ALL_CONVERSATION = 'SET_SELECTED_ALL_CONVERSATION'
export const SET_FILTERED_CONVERSATIONS = 'SET_FILTERED_CONVERSATIONS'
export const SET_CONVERSATIONS_FOR_SEARCH = 'SET_CONVERSATIONS_FOR_SEARCH'
export const SET_IS_MESSAGE_OPEN = 'SET_IS_MESSAGE_OPEN'
export const SET_IS_REPLY_MESSAGE_OPEN = 'SET_IS_REPLY_MESSAGE_OPEN'
export const SET_SELECTED_CONVERSATION = 'SET_SELECTED_CONVERSATION'
export const SET_SELECTED_LIST_FLAG = 'SET_SELECTED_LIST_FLAG'
export const SET_SOURCE_FILTER = 'SET_SOURCE_FILTER'
export const SET_TAG_FILTER = 'SET_TAG_FILTER'
export const REMOVE_CONVERSATION_ID_TO_EDIT = 'REMOVE_CONVERSATION_ID_TO_EDIT'
export const ADD_CONVERSATION_ID_TO_EDIT = 'ADD_CONVERSATION_ID_TO_EDIT'
export const SET_CONVERSATIONS_IDS_TO_EDIT = 'SET_CONVERSATIONS_IDS_TO_EDIT'
export const SET_DISPLAY_SYSTEM_WAVES = 'SET_DISPLAY_SYSTEM_WAVES'
export const SET_DISPLAY_RIGHT_CARD = 'SET_DISPLAY_RIGHT_CARD'
export const SET_CHANGE_DISPLAY_CONVER = 'SET_CHANGE_DISPLAY_CONVER'
export const SEND_EMAIL_SERVER = 'SEND_EMAIL_SERVER'
export const SET_EXPAND_MESSAGE = 'SET_EXPAND_MESSAGE'
export const SET_ACCEPTED_SENT = 'SET_ACCEPTED_SENT'
export const SET_ARCHIVED_STARRED = 'SET_ARCHIVED_STARRED'
export const SET_INDEX_CONVERSATION = 'SET_INDEX_CONVERSATION'
export const SET_DRAGGABLE_CONVERSATIONS_ID = 'SET_DRAGGABLE_CONVERSATIONS_ID'
export const SET_DRAGGABLE_ID_CONVERSATION = 'SET_DRAGGABLE_ID_CONVERSATION'
export const SET_START_DRAG = 'SET_START_DRAG'
export const SET_WAVE = 'SET_WAVE'
export const SET_CLOSE = 'SET_CLOSE'
export const SET_CONV_SELECTED_IN_SHOE_CONV = 'SET_CONV_SELECTED_IN_SHOE_CONV'
export const CONVERSATIONS_FILTER_EMPTY = 'CONVERSATIONS_FILTER_EMPTY'

export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'
export const MARK_AS_TRASH_CONVERSATIONS_MIDD = 'MARK_AS_TRASH_CONVERSATIONS_MIDD'
export const MARK_AS_TRASH_CONVERSATIONS = 'MARK_AS_TRASH_CONVERSATIONS'
export const MARK_AS_READ_OR_UNREAD_CONVERSATIONS_MIDD = 'MARK_AS_READ_OR_UNREAD_CONVERSATIONS_MIDD'
export const MARK_AS_READ_OR_UNREAD_CONVERSATIONS = 'MARK_AS_READ_OR_UNREAD_CONVERSATIONS'
export const SET_SELECTED_CONVERSATION_WAVE_ID = 'SET_SELECTED_CONVERSATION_WAVE_ID'


export function setFilteredConversations(conversations) {
    // 
    return {
        type: SET_FILTERED_CONVERSATIONS,
        payload: { filteredConversations: conversations, selectedConversation: conversations[0] }
    }
}
// export function removeConversation(id) {
//     return {
//         type: REMOVE_CONVERSATIONS,
//         payload: id
//     }
// }

export function setConversationsForSearch(conversations) {
    // let selectedConversation = conversations ? conversations[0] : "";
    console.log("action.payload in actions ", conversations)
    return {
        type: SET_CONVERSATIONS_FOR_SEARCH,
        payload: {
            conversations: conversations
            // selectedConversation: selectedConversation
        }
    }
}


export function setSelectedListFlag(txt) {

    console.log("setselectedlistflag ", txt)
    return {
        type: SET_SELECTED_LIST_FLAG,
        payload: txt
    }
}

export function editConversations(conversations, field) {
    return {
        type: EDIT_CONVERSATIONS_SERVER,
        payload: { conversations: conversations, field: field },
    }
}

// export function editConversationsT(conversations, field) {
//     return {
//         type: EDIT_CONVERSATIONST_SERVER,
//         payload: { conversations: conversations, field: field },
//     }
// }

export function setClose(bool) {
    return {
        type: SET_CLOSE,
        payload: bool
    }
}

export function editConversation(conversation, field) {

    return {
        type: EDIT_CONVERSATION_SERVER,
        payload: { conversation: conversation, field: field }
    }
    // return function (dispatch) {
    //     return conversationService.editConversation(conversation).then(edited => {
    //         dispatch({
    //             type: EDIT_CONVERSATION_SERVER,
    //             payload: edited
    //         })
    //     });
    // };
}

export function setSelectedConversation(conversation) {

    return {
        type: SET_SELECTED_CONVERSATION,
        payload: conversation
    }
}
export function convSelectedInShowConv(conversation) {
    return {
        type: SET_CONV_SELECTED_IN_SHOE_CONV,
        payload: conversation
    }
}
export function getConversations() {
    return {
        type: GET_CONVERSATIONS_SERVER,
    }
}

export function getSystemWaves() {
    return {
        type: GET_SYSTEM_WAVES_SERVER,
    }
}
export function newConversation(conversation, wave, fwd, draftId) {
    return {
        type: ADD_CONVERSATION_SERVER,
        payload: { conversation: conversation, wave: wave, forwardConversationId: fwd, draftId: draftId }
    }
}
export function uploadFilesServer(fd) {
    return {
        type: UPLOAD_FILES_SERVER,
        payload: fd
    }
}

export function addWaveServer(wave) {
    return {
        type: ADD_WAVE_SERVER,
        payload: { wave: wave }
    }
}

export function setIsMessageOpen(bool) {
    return {
        type: SET_IS_MESSAGE_OPEN,
        payload: bool
    }
}

export function setIsReplyMessageOpen(bool) {
    return {
        type: SET_IS_REPLY_MESSAGE_OPEN,
        payload: bool
    }
}

export function setSourceFilter(source) {

    return {
        type: SET_SOURCE_FILTER,
        payload: source
    }
}

export function setTagFilter(tagId) {
    return {
        type: SET_TAG_FILTER,
        payload: tagId
    }
}

export function deleteConversations(conversationsIds) {
    return {
        type: DELETE_CONVERSATIONS_SERVER,
        payload: conversationsIds
    }
}
export function deleteSystemWaves(ids) {

    return {
        type: DELETE_SYSTEM_WAVES_SERVER,
        payload: ids
    }
}
export function deleteConversation(conversationId) {

    return {
        type: DELETE_CONVERSATION_SERVER,
        payload: conversationId
    }
}

export function addConversationIdToEdit(id) {

    return {
        type: ADD_CONVERSATION_ID_TO_EDIT,
        payload: id
    }
}
export function setWave(bool) {

    return {
        type: SET_WAVE,
        payload: bool
    }
}

export function setConversationsIdsToEdit(isTrue, isForSearch) {
    //isTrue-- if the checkbox is checked
    //isForSearch-- if the select need to be from the conversationsForSearch
    //and not from filteredConversations
    return {
        type: SET_CONVERSATIONS_IDS_TO_EDIT,
        payload: { check: isTrue, isForSearch: isForSearch }
    }
}
export function setConversation(arr) {
    return {
        type: SET_CONVERSATIONS,
        payload: { conversations: arr }
    }
}

export function removeConversationIdToEdit(id) {
    return {
        type: REMOVE_CONVERSATION_ID_TO_EDIT,
        payload: id
    }
}

// export function setDisplaySystemWaves(bool) {
//     return {
//         type: SET_DISPLAY_SYSTEM_WAVES,
//         payload: bool
//     }
// }

export function setUploadProgress(prog) {
    return {
        type: SET_UPLOAD_PROGRESS,
        payload: prog
    }
}
export function downloadFileServer(file) {
    return {
        type: DOWNLOAD_FILE_SERVER,
        payload: file
    }
}
export function setEmailFromMassage(email) {

    return {
        type: SET_EMAIL_FROM_MASSAGE,
        payload: email
    }
}
export function sendEmailServer(email) {

    return {
        type: SEND_EMAIL_SERVER,
        payload: email
    }
}
export function setDisplayRightCard(displayCard) {

    return {
        type: SET_DISPLAY_RIGHT_CARD,
        payload: displayCard
    }
}
export function setExpandMessage(bool) {

    return {
        type: SET_EXPAND_MESSAGE,
        payload: bool
    }
}
export function setChangeDisplayConver(bool) {

    return {
        type: SET_CHANGE_DISPLAY_CONVER,
        payload: bool
    }
}

export function setSelectedAllConversation(selected) {
    return {
        type: SET_SELECTED_ALL_CONVERSATION,
        payload: selected
    }
}
export function setIndexConversation(indexConversation) {
    return {
        type: SET_INDEX_CONVERSATION,
        payload: indexConversation
    }
}
export function draggable(e) {
    return {
        type: SET_DRAGGABLE_CONVERSATIONS_ID,
        payload: e
    }
}
export function setStartDrag(bool) {

    return {
        type: SET_START_DRAG,
        payload: bool
    }
}
export function setDraggableIdConversation(dragConv) {
    return {
        type: SET_DRAGGABLE_ID_CONVERSATION,
        payload: dragConv
    }
}

export function createSystemWave(systemWaveBody) {
    return {
        type: CREATE_SYSTEM_WAVE,
        payload: systemWaveBody
    }
}

export function markAsTrashConversations(convs) {
    return {
        type: MARK_AS_TRASH_CONVERSATIONS_MIDD,
        payload: convs
    }
}

export function markAsReadOrUnreadConversations(convs) {
    return {
        type: MARK_AS_READ_OR_UNREAD_CONVERSATIONS_MIDD,
        payload: convs
    }
}


export function setSelecteConversationWaveId(waveId) {
    return {
        type: SET_SELECTED_CONVERSATION_WAVE_ID,
        payload: waveId
    }
}