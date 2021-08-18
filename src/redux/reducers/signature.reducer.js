// import {
//     SET_SELECTED_SIGNATURE_ID,
//     SET_SELECTED_COLOR,
//     // CHANGE_COLOR,
//     EDIT_SIGNATURE,
// } from '../actions/signature.actions'
import produce from 'immer'
// import { SET_SIGNATURES_LIST, REMOVE_SIGNATURE, ADD_SIGNATURE, SET_SIGNATURE } from '../middleware/signature.crud'
// import { SET_DEFAULT_SIGNATURE } from '../middleware/init.crud'
import { act } from 'react-dom/test-utils'
import { propTypes } from 'react-bootstrap/esm/Image'

import createReducer from "./reducerUtils";


export const initialState = {
    signaturesList: [],
    defaultSignature: {
        signatureName: "",
        full_name: "",
        role: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        main_color: "#11146A",
        text_color: "#11146A",
        align_text: "left",
        linkedin_icon: { url: "https://www.linkedin.com/company/leader-codes/", display: true, color: "", defaultColor: "#3b77b5" },
        twitter_icon: { url: "https://twitter.com/crm_leader", display: true, color: "", defaultColor: "#55abe1" },
        facebook_icon: { url: "https://www.facebook.com/leader.codes", display: true, color: "", defaultColor: "#3b5998" },
        instagram_icon: { url: "https://www.instagram.com/leader.codes/", display: true, color: "", defaultColor: "#3d719d" },
        youtube_icon: { url: "https://www.youtube.com/channel/UCowcLo6QhP3zHA1xX7JawaA", display: true, color: "", defaultColor: "#ce2827" },
        // whatsapp_icon: { url: "", display: true, color: "", defaultColor: "#5dc354" },
        upload_photo: { url: "", display: false },
        banner: { imgUrl: "", CTA: "", display: false },
        followTheLeader: { display: true }
    },
    selectedColor: "",
    //to change to index!
    selectedSignatureId: null
}

const signatureReducer = {

    setSignaturesList(state, action) {
        if (action.payload)
            state.selectedSignatureId = null
        state.signaturesList = action.payload
        state.signaturesList = state.signaturesList && state.signaturesList.filter(s => s.signatureName)
    },
    editSignature(state, action) {

        let mySignature
        //edit new signature fields
        if (state.selectedSignatureId === -1) {
            mySignature = state.defaultSignature
        }
        //edit signature from signaturesList
        else {
            mySignature = state.signaturesList.find(s => s._id === state.selectedSignatureId)
        }
        //to edit object in signature
        if (action.payload.fieldNameInObj) {
            //hide if the url is empty
            if ((action.payload.fieldNameInObj === "url" || action.payload.fieldNameInObj === "imgUrl") && action.payload.fieldValue !== "") {
                mySignature[action.payload.fieldName]["display"] = true
            }
            // else {
            //     mySignature[action.payload.fieldName]["display"] = true
            // }
            if (mySignature[action.payload.fieldName])
                mySignature[action.payload.fieldName][action.payload.fieldNameInObj] = action.payload.fieldValue
            else
                mySignature[action.payload.fieldName] = { display: true }
        }
        else {
            mySignature[action.payload.fieldName] = action.payload.fieldValue
        }
    },
    setSelectedSignatureId(state, action) {
        state.selectedSignatureId = action.payload;
    },
    setSelectedColor(state, action) {
        state.selectedColor = action.payload
    },
    setDefaultSignature(state, action) {
        let defaultSignature = state.defaultSignature
        if (action.payload.fullName) {
            defaultSignature.full_name = action.payload.fullName
        }
        else {
            defaultSignature.full_name = action.payload.username
        }
        if (action.payload.position)
            defaultSignature.role = action.payload.position
        if (action.payload.username)
            defaultSignature.email = `${action.payload.username}@mails.codes`
        if (action.payload.phone)
            defaultSignature.phone = action.payload.phone
        if (action.payload.address)
            defaultSignature.address = action.payload.address
        if (action.payload.imgProfile)
            defaultSignature.upload_photo = { display: true, url: action.payload.imgProfile }
    },
    addSignature(state, action) {
        state.signaturesList.push(action.payload)
        state.selectedSignatureId = null;
    },
    removeSignature(state, action) {
        let ind = state.signaturesList.findIndex(s => s._id === action.payload)
        if (ind !== -1) {
            state.signaturesList.splice(ind, 1)
        }
    },
    setSignature(state, action) {
        let signatureToEdit = state.signaturesList.findIndex(s => s._id === action.payload._id)
        if (signatureToEdit) {
            signatureToEdit = action.payload
        }
    },


}

export default produce((state, action) => createReducer(state, action, signatureReducer), initialState);
