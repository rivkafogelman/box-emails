// import tagService from '../../services/tag.service'
// import tagsReducer from '../reducers/tag.reducer'

export const GET_TAGS_SERVER = 'GET_TAGS_SERVER'
export const ADD_TAG_SERVER = 'ADD_TAG_SERVER'
export const DELETE_TAG_SERVER = 'DELETE_TAG_SERVER'
export const DELETE_TAGS_SERVER = 'DELETE_TAGS_SERVER'
export const EDIT_TAG_SERVER = 'EDIT_TAG_SERVER'
export const EDIT_TAGS_SERVER = 'EDIT_TAGS_SERVER'

export const SET_DISPLAY_TAGS = 'SET_DISPLAY_TAGS'
export const UPDATE_TAGS_IDS_TO_EDIT = 'UPDATE_TAGS_IDS_TO_EDIT'
export const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR'


export function getTags(email, check) {
     
    let subUser = { email: email, check: check }
    return {
        type: GET_TAGS_SERVER,
        payload: subUser
    }
}

export function addTag(tag) {
//  
    return {
        type: ADD_TAG_SERVER,
        payload: tag
    }
}

export function deleteTag(tagID) {
    return {
        type: DELETE_TAG_SERVER,
        payload: tagID
    }
}

export function deleteTags(whatToCheck) {
    return {
        type: DELETE_TAGS_SERVER,
        payload: { whatToCheck: whatToCheck }
    }
}

export function editTag(tag) {
    return {
        type: EDIT_TAG_SERVER,
        payload: tag
    }
}

export function editTags(tagsID, color) {
    return {
        type: EDIT_TAGS_SERVER,
        payload: { tagsID: tagsID, color: color }
    }
}

export function updateTagsIdsToEdit(toDo, id) {

    return {
        type: UPDATE_TAGS_IDS_TO_EDIT,
        payload: { toDo: toDo, id: id }
    }
}

export function setDisplayTags(bool) {
    return {
        type: SET_DISPLAY_TAGS,
        payload: bool
    }
}

export function setSelectedColor(color) {
    return {
        type: SET_SELECTED_COLOR,
        payload: color
    }
}



