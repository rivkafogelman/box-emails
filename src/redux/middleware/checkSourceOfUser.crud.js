import $ from 'jquery'
import { SET_USER_FROM_MOBILE } from '../actions/init.actions'
import keys from '../../Config/keys';
export const CHECK_SOURCE_OF_USER='CHECK_SOURCE_OF_USER'

export const checkSourseOfUsersMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === CHECK_SOURCE_OF_USER) {
        $.ajax({
            url: keys.API_URL + getState().init.userName + '/checkSourceOfUser',
            type: 'GET',
            // headers: { Authentication: getState().init.jwt },
            success: function (data) {
                console.log("CHECK_SOURCE_OF_USER",data);
                //nechama
                // dispatch({ type: SET_USER_FROM_MOBILE, payload: data })
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    return next(action)
}