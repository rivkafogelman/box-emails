import produce from 'immer';
import createReducer from "./reducerUtils";
// var url = window.location;
// var userId = (url.pathname.split('/')[1]);

const initialState = {

    alertStatuse: 0,
    //   alert2Statuse: 0,
    alertMessage: '',
    //   alertDeal: {
    //     status: 0,
    //     message: ""
    //   },
    //   alertQuickMessage: {
    //     status: 0,
    //     message: ""
    //   },
};

const agent = {

    setAlertstatuse(state, action) {

        state.alertStatuse = action.payload;
    },
    //   setAlertDeal(state, action) {
    //     state.alertDeal = action.payload;
    //   },
    setAlertMessage(state, action) {
        state.alertMessage = action.payload
    },
    //   setAlertQuickMessage(state, action) {
    //     state.alertQuickMessage = action.payload
    //   },
    //   setAlert2Statuse(state, action) {
    //     state.alert2Statuse = action.payload;
    //   },



};

export default produce((state, action) => createReducer(state, action, agent), initialState);