const jwt = document.cookie.split(";").filter(s => s.includes('jwt'))[0] ? document.cookie.split(";").filter(s => s.includes('jwt'))[0].split("=").pop() : ""
let userName = window.location.pathname.split('/')[1]

class initService {
    getUidByUserName = () => {
        return fetch("https://box.dev.leader.codes/api/getUser/" + userName, {
            method: "GET",
            withCradentials: true,
            dataType: "json",
            contentType: "application/json"
        }).then(res => { return res.json() }).then((result) => {
            console.log('userId: ', result)
            return result.uid
        }, (error) => {
            console.log(error)
        }
        )
    }

    getUser = () => {
        return fetch("https://box.dev.leader.codes/api/getUser/" + userName,
            {
                method: 'GET'
            })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                console.log("user from getUser", result.user)
                return result.user
            }, (err) => {
            })
    }

    getUsersEmails = () => {
        return fetch("https://box.dev.leader.codes/api/" + userName + "/contact/getUsersEmails", {
            method: "GET",
            headers: {
                "Authentication": jwt
            },
        }).then(res => { return res.json() }).then((result) => {

            console.log('usersEmails: ', result.users)
            return result.users
        }, (error) => {

            console.log(error)
        }
        )
    }

    getContacts = () => {
        return fetch("https://box.dev.leader.codes/api/" + userName + "/contact/getAllContacts", {
            method: "POST",
            headers: {
                "Authentication": jwt
            },
        }).then(res => { return res.json() }).then((result) => {
            console.log('allUserContacts: ', result.contacts)
            return result.contacts
        }, (error) => {
            console.log(error)
        })
    }

    createLead = (lead) => {
        return fetch(`https://api.dev.leader.codes/${userName}/createContact`, {
            method: 'POST',
            headers: {
                'Authorization': jwt
            },
            data: lead
        }).then(res => {
            return res.data.newContact;
        }).catch(err => {
            console.log(err)
        })
    }

    getTime = (timestamp) => {
        let time = new Date(timestamp),
            timeReturn = '';
        let timeMinutes = time.getMinutes();
        let timeHours = time.getHours();
        let timeDay = time.getDate();
        let timeMounth = time.getMonth() + 1;
        let year = time.getFullYear();

        let timeMinutesDate = new Date().getMinutes();
        let timeHoursDate = new Date().getHours();
        let timeDayDate = new Date().getDate();
        let timeMounthDate = new Date().getMonth() + 1;
        let yearDate = new Date().getFullYear();

        if (year === yearDate) {
            if (timeMounth === timeMounthDate) {
                if (timeDay === timeDayDate) {
                    if (timeHours === timeHoursDate)
                        if (timeMinutes === timeMinutesDate) {
                            timeReturn = 'Now';
                        }
                        else {
                            timeReturn = time.toString().substr(15, 6)
                        }
                    else {
                        timeReturn = time.toString().substr(15, 6)
                    }
                }
                else {
                    timeReturn = time.toString().substr(4, 7)
                }
            }
            else {
                timeReturn = time.toString().substr(4, 7)
            }
        }
        else {
            timeReturn = timeDay + '/' + timeMounth + '/' + year
        }
        return timeReturn;
    }
}
export default new initService()