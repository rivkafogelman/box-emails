const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJaZ0l1YnV2bGNtZUI1S1VUdE1BQ1FUMmJKaEgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjA4NDYwNjIyfQ.gbEB6-vr4lBv1H2ZRKxlUHizWP1ueBc7r_ClKxNJmB4"

let userName = window.location.pathname.split('/')[1]

// import FileSaver from 'file-saver';

class conversationService {
    editConversation = (conversation) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/conversation/editConversation', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "conversation": conversation })
        }).then(res => { return res.json() }).then((result) => {
            console.log('updated conversation: ', result)
            return result.result
        }, (error) => {
            console.log(error)
        })
    }

    editConversations = (conversations) => {

        return fetch('https://box.dev.leader.codes/api/' + userName + '/conversation/editConversations', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "conversations": conversations })
        }).then(res => { return res.json() }).then((result) => {
            console.log('updated conversations: ', result)
            return result.editedConversations
        }, (error) => {
            console.log(error)
        })
    }

    getConversations = () => {

        //to change to box only ---box.dev ->box
        return fetch('https://box.dev.leader.codes/api/' + userName + '/conversation/getAllConversations', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
        }).then(res => { return res.json() }).then((result) => {
            return result.Conversations
        }, (error) => {
            console.log(error)
        })
    }

    deleteConversations = (ids) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/conversation/deleteConversations', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "conversationsID": ids })
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    newConversation = (conversation, wave) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/conversation/newConversation', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authentication": jwt
            },
            body: JSON.stringify({ "conversation": conversation, "wave": wave })
        }).then(res => { return res.json() }).then(
            (result) => {
                console.log(result)
                return result
            },
            (error) => {

                console.log(error)
            }
        )
    }

    newWave = (wave) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/wave/newWave', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "wave": wave })
        })
            .then(res => { return res.json() })
            .then((result) => {
                console.log(result.newWave)
                return result.newWave
            }, (error) => {
                console.log(error)
            }
            )
    }

    uploadFiles = (formData) => {

        return fetch("https://box.dev.leader.codes/api/" + userName + "/wave/uploadFiles", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: jwt
            },
            body: formData
            // contentType: false,
            // processData: false,
            // headers: { "authorization": jwt },
            // body: JSON.stringify(formData)
        }, (event) => {

            // setUploadProgress(Math.round((100 * event.loaded) / event.total));

        }).then(res => { return res.json() }).then(
            (result) => {

                return result.files
            },
            (error) => {

                console.log(error)
            }
        )
    }

    // exportRecordToExcel = (record) => {
    //     return ({ fetch }) => ({
    //         type: EXPORT_RECORD_TO_EXCEL,
    //         payload: {
    //             promise: fetch('/records/export', {
    //                 credentials: 'same-origin',
    //                 method: 'post',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(data)
    //             }).then(function (response) {
    //                 return response.blob();
    //             }).then(function (blob) {
    //                 FileSaver.saveAs(blob, 'nameFile.zip');
    //             })
    //         }
    //     })
    // }


    downloadFile = (fileURL, type) => {

        return fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
            method: 'GET',
            headers: {
                'Content-Type': `application/${type}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            },
        })
            .then((response) => response.blob())
            .then((blob) => {

                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `FileName.${type}`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }


    getTime = (timestamp, addTime) => {
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
        let minsToAdd=timeMinutes<10?'0'+timeMinutes:timeMinutes
        const hourToAdd = `${timeHours}:${minsToAdd}`

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
                    timeReturn = addTime ? time.toString().substr(4, 7) + hourToAdd : time.toString().substr(4, 7)
                }
            }
            else {
                timeReturn = addTime ? time.toString().substr(4, 7) + hourToAdd : time.toString().substr(4, 7);
            }
        }
        else {
            timeReturn = addTime ? timeDay + '/' + timeMounth + '/' + year + hourToAdd : timeDay + '/' + timeMounth + '/' + year;
        }
        return timeReturn;
    }
    getContactLetters = (name) => {
        let letters = ""
        if (name) {
            letters = name.split(' ')
            if (letters.length > 1) {
                letters = letters[0][0] + letters[1][0]
            }
            else {
                letters = letters[0][0] + letters[0][1]
            }
            return letters.toUpperCase()
        }
    }

}

export default new conversationService()