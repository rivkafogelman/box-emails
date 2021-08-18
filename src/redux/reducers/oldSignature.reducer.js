// import {
//     SET_FULL_NAME, SET_ROLE, SET_EMAIL, SET_PHONE, SET_WEBSITE,
//     SET_ADDRESS, SET_MAIN_COLOR, SET_TEXT_COLOR, SET_TEXT_SIZE,
//     SET_LINKEDIN_ICON, SET_TWITTER_ICON, SET_FACEBOOK_ICON,
//     SET_INSTAGRAM_ICON, SET_YOUTUBE_ICON, SET_WHATSAPP_ICON,
//     SET_UPLOAD_PHOTO, SET_DISPLAY,
//     SET_IS_OPEN, SET_ALIGN_TEXT, SET_SIGNATURE_NAME,
//     SET_CURRENT_SIGNATURE,
//     SET_DEFAULT_SIGNATURE,
//     SET_SELECTED_COLOR,
//     SET_BANNER,
//     SET_UPLOAD_BANNER_PHOTO,
//     ADD_SIGNATURE
//     // CHANGE_COLOR

// } from '../actions/signature.actions'
import produce from "immer";
import logoImage from "../../assets/yourLogo.png";
import {
  SET_SIGNATURE,
  EDIT_SIGNATURE,
  SET_SIGNATURES_LIST,
} from "../middleware/signature.crud";
import { act } from "react-dom/test-utils";
import createReducer from "./reducerUtils";
import { editSignature } from "../actions/signature.actions";
import { setSelectedColor } from "../actions/tag.actions";

export const initialState = {
  signatureList: [],
  signatureFullList: [],
  signatureName: "add new",
  full_name: "",
  role: "",
  email: { field: "Email", value: "" },
  phone: { field: "Phone", value: "" },
  address: { field: "Address", value: "" },
  website: "",
  main_color: "#11146A",
  text_color: "#11146A",
  text_size: 14,
  linkedin_icon: {
    url: "https://www.linkedin.com/company/leader-codes",
    display: true,
    color: "",
    defaultColor: "#3b77b5",
  },
  twitter_icon: {
    url: "https://twitter.com/crm_leader",
    display: true,
    color: "",
    defaultColor: "#55abe1",
  },
  facebook_icon: {
    url: "https://www.facebook.com/leader.codes",
    display: true,
    color: "",
    defaultColor: "#3b5998",
  },
  instagram_icon: {
    url: "https://www.instagram.com/leader.codes",
    display: true,
    color: "",
    defaultColor: "#3d719d",
  },
  youtube_icon: {
    url: "https://www.youtube.com/channel/UCowcLo6QhP3zHA1xX7JawaA",
    display: true,
    color: "",
    defaultColor: "#ce2827",
  },
  whatsapp_icon: { url: "", display: true, color: "", defaultColor: "#5dc354" },
  upload_photo: { url: logoImage, display: true },
  banner: { imgUrl: logoImage, CTA: "", display: true },
  align_text: "left",
  // isOpen: false,
  selectedColor: "",
  currentSignature: null,
};

const signatureReducer = {
  setFullName(state, action) {
    state.full_name = action.payload;
  },
  setRole(state, action) {
    state.role = action.payload;
  },
  setEmail(state, action) {
    if (action.option === "value") state.email.value = action.payload;
    else if (action.option === "field") state.email.field = action.payload;
  },
  setPhone(state, action) {
    if (action.option === "value") state.phone.value = action.payload;
    else if (action.option === "field") state.phone.field = action.payload;
  },
  setAddress(state, action) {
    if (action.option === "value") state.address.value = action.payload;
    else if (action.option === "field") state.address.field = action.payload;
  },
  setWebsite(state, action) {
    state.website = action.payload;
  },
  setMainColor(state, action) {
    state.main_color = action.payload;
  },
  setTextColor(state, action) {
    state.text_color = action.payload;
  },
  setTextSize(state, action) {
    state.text_size = action.payload;
  },
  setLinkedInIcon(state, action) {
    state.linkedin_icon = action.payload;
  },
  setTwitterIcon(state, action) {
    state.twitter_icon = action.payload;
  },
  setFacebookIcon(state, action) {
    state.facebook_icon = action.payload;
  },
  setInstagramIcon(state, action) {
    state.instagram_icon = action.payload;
  },
  setYoutubeIcon(state, action) {
    state.youtube_icon = action.payload;
  },
  setWhatsappIcon(state, action) {
    state.whatsapp_icon = action.payload;
  },
  setUploadPhoto(state, action) {
    state.upload_photo.url = action.payload;
  },
  setDisplay(state, action) {
    state[action.field].display = action.payload;
  },
  setSignature(state, action) {},
  addSignature(state, action) {
    state.full_name = action.payload.full_name;
    state.role = action.payload.role;
    state.email = action.payload.email;
    state.phone = action.payload.phone;
    state.address = action.payload.address;
    state.website = action.payload.website;
    state.main_color = action.payload.main_color;
    state.text_color = action.payload.text_color;
    state.text_size = action.payload.text_size;
    state.linkedin_icon = action.payload.linkedin_icon;
    state.twitter_icon = action.payload.twitter_icon;
    state.facebook_icon = action.payload.facebook_icon;
    state.instagram_icon = action.payload.instagram_icon;
    state.youtube_icon = action.payload.youtube_icon;
    state.whatsapp_icon = action.payload.whatsapp_icon;
    state.upload_photo = action.payload.upload_photo;
    state.banner = action.payload.banner;
  },
  setDefaultSignature(state, action) {
    if (action.payload.fullName !== "")
      state.full_name = action.payload.fullName;
    if (action.payload.position !== "") state.role = action.payload.position;
    if (action.payload.email !== "")
      state.email = { field: "Email", value: action.payload.email };
    if (action.payload.phone !== "")
      state.phone = { field: "Phone", value: action.payload.phone };
    if (action.payload.address !== "")
      state.address = { field: "Address", value: action.payload.address };
    if (action.payload.imgProfile !== "")
      state.upload_photo = { display: true, url: action.payload.imgProfile };
  },
  setIsOpen(state, action) {
    state.isOpen = action.payload;
  },
  editSignature(state, action) {},
  setSignaturesList(state, action) {
    let tempArray = [];
    action.payload.map((item) => {
      if (item.signatureName) tempArray.push(item.signatureName);
    });
    state.signatureList = tempArray;
    state.signatureFullList = action.payload;
    state.signatureFullList = state.signatureFullList.filter(
      (s) => s.signatureName
    );
  },
  setAlignText(state, action) {
    state.align_text = action.payload;
  },
  setSignatureName(state, action) {
    state.signatureName = action.payload;
  },
  setCurrentSignature(state, action) {
    state.currentSignature = action.payload;
  },
  setSelectedColor(state, action) {
    state.selectedColor = action.payload;
  },
  // case CHANGE_COLOR:
  //
  //     switch (action.payload.changeFor) {
  //         case "facebook":
  //             state.facebook_icon.color = action.payload.color
  //             break;
  //         case "twitter":
  //             state.twitter_icon.color = action.payload.color
  //             break;
  //         case "linkedin":
  //             state.linkedin_icon.color = action.payload.color
  //             break;
  //         case "youtube":
  //             state.youtube_icon.color = action.payload.color
  //             break;
  //         case "instagram":
  //             state.instagram_icon.color = action.payload.color
  //             break;
  //         case "whatsapp":
  //             state.whatsapp_icon.color = action.payload.color
  //         break;
  //     default:
  //         break
  // }
  // break
  setBanner(state, action) {
    state.banner = action.payload;
  },
  setUploadBannerPhoto(state, action) {
    state.banner.imgUrl = action.payload;
  },
};

export default produce(
  (state, action) => createReducer(state, action, signatureReducer),
  initialState
);
