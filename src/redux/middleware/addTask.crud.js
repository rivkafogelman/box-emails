import { ADD_TASK_SERVER } from '../actions/addTask.actions'
import $ from 'jquery'
import checkPermission from './init.crud'
// all text
import allText from '../../allText.json';
import keys from '../../Config/keys';   
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
export const addTask = ({ dispatch, getState }) => next => action => {
    if (action.type === ADD_TASK_SERVER) {
        let urlData = `${keys.API_URL}${getState().init.userName}/addTask`
        let task = action.payload;
        console.log(task)
        let leadSystemWave = {
            subject: "New lead created successfully",
            body: bodyFromFields(task),
            from: "@hub",
            source: "hub",
            files: null
        }
        dispatch(actions.createSystemWave(leadSystemWave))
        // $.ajax({
        //     url: urlData,
        //     method: 'POST',
        //     headers: {
        //         Authorization: getState().init.jwt
        //     },

        //     contentType: "application/json; charset=utf-8",
        //     data: JSON.stringify({ task }),
        //     success: function (data) {
        //         console.log("new task from middleware ", data);
              
        //         let leadSystemWave = {
        //             subject: "New lead created successfully",
        //             body: bodyFromFields(task),
        //             from: "@hub",
        //             source: "hub",
        //             files: null
        //         }
        //         dispatch(actions.createSystemWave(leadSystemWave))
        //         console.log("new' task created successfully ");
        //         //show notification create task
        //         const notificationToShow = { info: (allText.taskCreated), icon: null, color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
        //         dispatch(actions.setNotification(notificationToShow));
        //     },
        //     error: function (err) {
        //         console.log(err)
        //         let leadSystemWave = {
        //             subject: "New lead created successfully",
        //             body: bodyFromFields(task),
        //             from: "@hub",
        //             source: "hub",
        //             files: null
        //         }
        //         dispatch(actions.createSystemWave(leadSystemWave))
        //         console.log("No new task was created");
        //         //show notification err create task
        //         // const notificationToShow = { info: allText['errorCreateTask'], icon: 'err', color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
        //         // dispatch(actions.setNotification(notificationToShow));
        //         checkPermission(err).then((res) => { })
        //     }
        // });
    }
    return next(action);
}

