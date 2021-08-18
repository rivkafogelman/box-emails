import $ from 'jquery'
// import { setNotification } from '../actions/notification.actions';
import checkPermission from './init.crud'
// import { createSystemWave } from '../actions/conversation.actions'
import keys from '../../Config/keys';
// import {ADD_MEET_SERVER} from '../actions/addMeeting.actions'
// all text
import allText from '../../allText.json'
import {actions} from '../actions/action'
const bodyFromFields = (deal) => {
    let str = ``;
    for (let key in deal) {
        if (deal[key] !== undefined && deal[key] !== '')
            str += `<p>${key}: ${deal[key]}<p>`
    }
    return str;
}
//box
export const addMeet = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_MEET_SERVER') {
        console.log("reducer add Meet!!!!!!!!!")
        debugger
        let userName = getState().init.userName;
        const urlData = `${keys.API_URL}${userName}/addMeet`
        let meet = action.payload;
        let meetSystemWave = {
            subject: "New meet created successfully",
            body: bodyFromFields(meet),
            from: "@calendar",
            source: "Calendar",
            files: null
        }
        dispatch(actions.createSystemWave(meetSystemWave))
        // $.ajax({
        //     url: urlData,
        //     method: 'POST',
        //     headers: {
        //         Authorization: getState().init.jwt
        //     },
        //     contentType: "application/json; charset=utf-8",
        //     data: JSON.stringify(meet),
        //     success: function (meet) {
        //         console.log("succes")
        //         // alert("n ew deal from middleware ", meet)
        //         //show notification add meeting
        //         debugger
        //         let meetSystemWave = {
        //             subject: "New meet created successfully",
        //             body: bodyFromFields(meet),
        //             from: "@calander",
        //             source: "Calander",
        //             files: null
        //         }
        //         dispatch(actions.createSystemWave(meetSystemWave))
        //         const notificationToShow = { info: (allText.meetCreated), icon: 'meeting', color: 'purple', notUndo: true }

        //         dispatch(actions.setNotification(notificationToShow))
        //     },
        //     error: function (err) {
        //         debugger
        //         let meetSystemWave = {
        //             subject: "New meet created successfully",
        //             body: bodyFromFields(meet),
        //             from: "@calander",
        //             source: "Calander",
        //             files: null
        //         }
        //         dispatch(actions.createSystemWave(meetSystemWave))

        //         // console.log("err in meet ",err)
        //         //show notification err create meet
        //         // const notificationToShow = { info: allText['errorCreateMeet'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
        //         // dispatch(actions.setNotification(notificationToShow));
        //         checkPermission(err).then((res) => { })
        //     }
        // });
    }
    return next(action);
}