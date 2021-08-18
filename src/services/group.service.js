const jwt = document.cookie.split(";").filter(s => s.includes('jwt'))[0] ? document.cookie.split(";").filter(s => s.includes('jwt'))[0].split("=").pop() : ""
// let userName = window.location.pathname.split('/')[1]
const $ = require('jquery')

class groupService {

    addNewGroup = (group, userName, jwt) => {
        debugger
        let isDevOrLocal = window.location.href.includes('dev') ? window.location.href.includes('dev') : window.location.href.includes('localhost') ? window.location.href.includes('localhost') : null
        let url;
        if (isDevOrLocal) {
            url = 'https://box.dev.leader.codes/api/';
        }
        else {
            url = 'https://box.leader.codes/api/';
        }

        return fetch(url + userName + '/group/newGroup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt,
            },
            body: JSON.stringify(group)
        })
            .then(response => response.json())
            .then((data) => {
                // debugger

                console.log('new group service: ', data)
                return data
            })
            .catch(() => {
                debugger
                alert('errorr')
            })
    }

}
export default new groupService()