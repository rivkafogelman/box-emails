import $ from 'jquery'
import { GET_ALL_TEMPLATES_SERVER, SET_TEMPLATES_LIST } from '../actions/templates.actions'
import keys from '../../Config/keys';

//box
export const getAllTemplatesMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === GET_ALL_TEMPLATES_SERVER) {
        let templates = []
        let users = [getState().subUsers.selectedSubUser]
        if (getState().subUsers.mailChannels && getState().subUsers.mailChannels.length !== 0) {
            users = [...users, ...getState().subUsers.mailChannels];
            // console.log("users in templates", users)
        }
        users.forEach((u) => {
            // console.log("user in get template", u)
            $.ajax({
                url: `${keys.API_URL}${u}/getTemplatesFromMailart`,
                type: 'GET',
                headers: { Authentication: getState().init.jwt },
                success: function (data) {
                    console.log("data templates from middleware", data.templates);
                    if (data.templates) {
                        templates = [...templates, ...data.templates]
                        dispatch({ type: SET_TEMPLATES_LIST, payload: templates })
                    }
                    else {
                        dispatch({ type: SET_TEMPLATES_LIST, payload: templates })
                    }
                },
                error: function (err) {
                    console.log("err in getAllTemplatesMidd", err);
                }
            })
        })

    }
    return next(action)
}