import $ from 'jquery'
import checkPermission from './init.crud'
import {actions} from '../actions/allActions'
import { saveGoogeleTokenMidd } from './googleAuth.crud'
import { Link, useParams } from 'react-router-dom';
import keys from '../../Config/keys';

//box
export const systemWaveForNotification = ({ dispatch, getState }) => next => action => {
    
    if (action.type === 'SYSTEM_WAVE_FOR_NOTIFICATION') {
        console.log('QQQin system wave to notification')
        const notification=action.payload
        console.log('notification',notification)
        const body={
            "subject": notification.title,
            "body": 'notification sended from you: '+notification.body?notification.body:''+notification.image?notification.image:'',
        // }${notification.image?notification.image:''}</div>`,
            "to": [getState().init.userName],
            "from": "@push",
            "source": "PushNotification",
            "files": null
            }
        console.log('body',body)
        $.ajax({
            url: keys.API_URL + 'createSystemWave',
            type: 'POST',
            headers: { 
                // Authentication: getState().init.jwt
             },
            data: body,
            success: function (result) {
                console.log("success send email to manager", result);
                return true
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const addTokenToNotification = ({ dispatch, getState }) => next => action => {
    
    if (action.type === 'ADD_TOKEN_TO_NOTIFICATION') {
        console.log('in add contact to notification')
        const token=action.payload
        console.log('token',token)
        // const { userName } = useParams();
        $.ajax({
            url: keys.API_URL +
              getState().init.userName+
            //'michalgiladi'+
            // userName+
             '/notification/addTokenToNotification',
            type: 'POST',
            headers: { Authentication: 
                 getState().init.jwt
               // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqOEt3QlMyUEFSU3hkbHU4OW5MNE5aQzI0TjgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIwMjk1MTExfQ.iFTlDEw4AqFq_avFuDmV2k8lC8bQz57Dg-GLwX91VGA'
             },
            data: token,
            success: function (result) {
                console.log("success add contact to notification", result);
                return true
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}



export const getAllNotaficaionsToManager = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_NOTAFICAIONS_TO_MANAGER') {
        console.log('in get all notifications')
        $.ajax({
            url: keys.API_URL +
            //  getState().init.userName+
            'michalgiladi'+
             '/notification/getAllNotaficaionsToManager',
            type: 'POST',
            headers: { Authentication: 
                // getState().init.jwt
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqOEt3QlMyUEFSU3hkbHU4OW5MNE5aQzI0TjgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIwMjk1MTExfQ.iFTlDEw4AqFq_avFuDmV2k8lC8bQz57Dg-GLwX91VGA'
             },
            success: function (result) {
                console.log("success get all notification", result.notifications);
                dispatch(actions.setAllNotifications(result.notifications))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const createNewNotification = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_NEW_NOTIFICATION') {
        console.log('in create notifications')
        $.ajax({
            url: keys.API_URL +
            //  getState().init.userName+
            'michalgiladi'+
             '/notification/createNotification',
            type: 'POST',
            headers: { Authentication: 
               // getState().init.jwt
               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqOEt3QlMyUEFSU3hkbHU4OW5MNE5aQzI0TjgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIwMjk1MTExfQ.iFTlDEw4AqFq_avFuDmV2k8lC8bQz57Dg-GLwX91VGA' 
            },
            data: action.payload,
            success: function (result) {
                console.log("success create notification", result);
                // dispatch(actions.setAllNotification(result))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}
export const newUserToNotification = ({ dispatch, getState }) => next => action => {
    if (action.type === 'NEW_USER_TO_NOTIFICATION') {
        console.log('in new user to notification')
        const notificationId=action.payload
        console.log('notificationId',notificationId)
        $.ajax({
            url: keys.API_URL +
            //  getState().init.userName+
            'michalgiladi'+
             '/notification/newUserToNotification',
            type: 'POST',
            headers: { Authentication: 
                // getState().init.jwt
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqOEt3QlMyUEFSU3hkbHU4OW5MNE5aQzI0TjgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIwMjk1MTExfQ.iFTlDEw4AqFq_avFuDmV2k8lC8bQz57Dg-GLwX91VGA'
             },
            data: notificationId,
            success: function (result) {
                console.log("success add user to notification", result);
                // dispatch(actions.setAllNotifications(result.notifications))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const sendNotificationToAll = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SEND_NOTIFICATION_TO_ALL') {
        console.log('in send notification')
        const notification=action.payload
        console.log('notification',notification)
        $.ajax({
            url: keys.API_URL +
               getState().init.userName+
           // 'michalgiladi'+
             '/notification/sendSingleNotification',
            type: 'POST',
            headers: { Authentication: 
                 getState().init.jwt
                //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJqOEt3QlMyUEFSU3hkbHU4OW5MNE5aQzI0TjgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIwMjk1MTExfQ.iFTlDEw4AqFq_avFuDmV2k8lC8bQz57Dg-GLwX91VGA'
             },
            data: notification,
            success: function (result) {
                console.log("success send notification!!", result)
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    
    }
    return next(action)
}