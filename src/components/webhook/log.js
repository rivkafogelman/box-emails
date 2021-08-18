
let request = require('request')

const createNewLog = (logDate, userName, action, details, actionBody, jwt) => {
    return new Promise((resolve, reject) => {
        let url = `https://activity-log.leader.codes/${userName}/createNewLog`
        let body = {
            logDate: logDate,
            appName: 'webhook',
            action: action,
            details: details,
            actionBody: actionBody
        }
        const options = {
            url: url,
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                Authorization: jwt,
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        }
        request(options, (err, res, body) => {
            if (err)
                reject(err)
            else {
                console.log(body);
                let data = JSON.parse(body)
                resolve(data)
            }
        })
    })
}
module.exports = {
    createNewLog
}


let Schema = require('mongoose').model(schemaName)
let objectShareToSendActivity = await Schema.findById(objectId)
const createActivity = await activityLogController.createNewLog(new Date(), userName, 'shared project', 'you share project member and team', objectShareToSendActivity, req.headers['authorization'])



