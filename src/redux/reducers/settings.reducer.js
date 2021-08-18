// import { SET_SETTINGS, SET_COLOR_TEXT, SET_ADD_BACKGROUND_PHOTO, DELETE_BACKGROUND_PHOTO, EDIT_BACKGROUND_PHOTO, SET_BACKGROUND_PHOTOS } from '../middleware/settings.crud'
import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    textColor: "light",
    selectedBackground: '',
    backgroundPhotos: [],
}
const settingsReducer = {

    setSettings(state, action) {
        state.textColor = action.payload.textColor;
        if (action.payload.selectedBackground)
            state.selectedBackground = action.payload.selectedBackground;
        state.backgroundPhotos = action.payload.backgroundPhotos
    },
    setColorText(state, action) {
        state.textColor = action.payload
    },
    setAddBackgroundPhoto(state, action) {
        state.backgroundPhotos = state.backgroundPhotos.concat(action.payload)
        state.selectedBackground = action.payload.url
    },
    setBackgroundPhotos(state, action) {
        state.backgroundPhotos = action.payload
    },
    deleteBackgroundPhoto(state, action) {
        state.backgroundPhotos = state.backgroundPhotos.filter(bg => bg.name != action.payload)
    },
    editBackgroundPhoto(state, action) {
        state.selectedBackground = action.payload
    },

}

export default produce((state, action) => createReducer(state, action, settingsReducer), initialState);

