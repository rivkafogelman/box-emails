import $, { inArray } from 'jquery'
import checkPermission from './init.crud'

// import { ADD_GROUP_SERVER, DELETE_GROUP_SERVER, GET_GROUPS_SERVER, UPDATE_GROUP_SERVER } from "../actions/group.actions";
// import { SET_NEW_CONTACT } from '../actions/init.actions';
import keys from '../../Config/keys';
// export const ADD_GROUP = 'ADD_GROUP'
// export const DELETE_GROUP = 'DELETE_GROUP'
// export const UPDATE_GROUP = 'UPDATE_GROUP'
// export const SET_NEW_CONTACTS = 'SET_NEW_CONTACTS'
// export const SET_GROUPS = 'SET_GROUPS'
import {actions} from '../actions/action'

export const getGroupsMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_GROUPS_SERVER') {
        let name =''
        const selectedSub=getState().subUsers.selectedSubUser
        if (selectedSub&&selectedSub!==getState().init.userName) {
            name = selectedSub
        }
        $.ajax({
            url: keys.API_URL + getState().init.userName + "/group/getGroups",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: name ? { subUser: name  } : '',
            success: function (data) {
                console.log("get groups from middleware", data.groups);

                dispatch({ type: 'SET_GROUPS', payload: { groups: data.groups } })

            },
            error: function (err) {
                checkPermission(err).then((res) => {
                    console.log("error in get groups",err)
                })
            }
        })
    }
    return next(action)
}

export const addGroupMidd = ({ dispatch, getState }) => next => action => {


    if (action.type === 'ADD_GROUP_SERVER') {
        debugger
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/group/newGroup",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { group: action.payload },
            success: function (data) {

                console.log("new group from middleware", data.group);
                dispatch(actions.addGroup({ group: data.group } ))
                console.log("new group contacts: ", data.newContacts);
                dispatch(actions.setNewContacts(data.newContacts))
            },
            error: function (err) {

                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const updateGroupMidd = ({ dispatch, getState }) => next => action => {

    if (action.type === 'UPDATE_GROUP_SERVER') {
debugger
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/group/editGroup",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: {
                groupname: action.payload.groupName,
                members: action.payload.members,
                newname: action.payload.newName
            },
            success: function (data) {
                console.log("update group from middleware", data.group);

                if (data.group)
                    dispatch(actions.updateGroup( { group: data.group, oldGroupName: action.payload.groupName } ))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}

export const deleteGroupMidd = ({ dispatch, getState }) => next => action => {
    //    
 
    if (action.type === 'DELETE_GROUP_SERVER') {
        $.ajax({
            url: keys.API_URL + getState().subUsers.selectedSubUser + "/group/deleteGroup",
            type: 'POST',
            headers: { Authentication: getState().init.jwt },
            data: { groupname: action.payload },
            success: function (data) {
                console.log("delete group from middleware", data);
                dispatch(actions.deleteGroup( { groupName: action.payload } ))
            },
            error: function (err) {
                checkPermission(err).then((res) => { })
            }
        })
    }
    return next(action)
}