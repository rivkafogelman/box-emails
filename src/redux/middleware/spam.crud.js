import { ADD_CONTACT_TO_SPAM, REMOVE_SPAM_CONVERSATION } from '../actions/spam.action'
import keys from '../../Config/keys';
export const addSpamMidd = ({ dispatch, getState }) => next => action => {
     
    if (action.type === 'ADD_SPAM') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "__cfduid=de4360df5f8306fdd4aa98ce915ed738d1619342785");

        var raw = JSON.stringify({
            "spamContactID": "5ff2d34f77ea56e492642d45"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(keys.API_URL + getState().init.userName + "/spam/addSpamContactID", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
    return next(action)
}

export const removeSpamMidd = ({ dispatch, getState }) => next => action => {
     
    if (action.type === 'REMOVE_SPAM') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "__cfduid=de4360df5f8306fdd4aa98ce915ed738d1619342785");

        var raw = JSON.stringify({
            "spamContactID": "5ff2d34f77ea56e492642d45"
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(keys.API_URL + getState().init.userName + '/spam/deleteSpamContactID', requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return next(action)
}

