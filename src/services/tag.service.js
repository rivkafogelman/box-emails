const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJaZ0l1YnV2bGNtZUI1S1VUdE1BQ1FUMmJKaEgzIiwiZW1haWwiOiJtaWNoYWxnaWxhZGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjA4NDYyMDk3fQ._uszcK2Cxrln7UicnKmI4kKMpYdB9JQ12cVN-e9KU60"
let userName = "michalgiladi"
class tagService {
    getTags = () => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/TgetAllTags', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
        }).then(res => { return res.json() }).then((result) => {

            console.log('tags: ' + result.tags)
            return result.tags
        }, (error) => {

            console.log(error)
            return error.message
        }
        )

        // return axios.post('https://box.leader.codes/api/' + userID + '/tag/getAllTags',{    
        // headers:{
        //         "Authentication": jwt
        //     }
        // }).then((response) => {
        //     console.log(response.tags)
        //     return response.tags
        // })
    }

    addTag = (tag) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/newTag', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "tag": tag })
        }).then(res => { return res.json() }).then((result) => {
            console.log('tags: ' + result.tag1)
            return result.tag1
        }, (error) => {
            console.log(error)
            return error.message
        })
    }

    deleteTag = (tagID) => {

        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/deleteTag', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "tagID": tagID })
        }).then(res => { return res.json() }).then((result) => {

            console.log(result);
            return result
        }, (error) => {

            console.log(error)
            return error.message
        })
        // return axios.post('https://box.leader.codes/api/' + userID + '/tag/getAllTags',{    
        // headers:{
        //         "Authentication": jwt
        //     }
        // }).then((response) => {
        //     console.log(response.tags)
        //     return response.tags
        // })
    }

    deleteTags = (tagsID) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/deleteTags', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "tagsID": tagsID })
        }).then(res => { return res.json() }).then((result) => {
            console.log(result);
            return result
        }, (error) => {

            console.log(error)
            return error.message
        })
    }

    editTag = (tag) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/editTag', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({ "tag": tag })
        }).then(res => { return res.json() }).then((result) => {
            console.log(result);
            return result
        }, (error) => {

            console.log(error)
            return error.message
        })
    }


    editTags = (tagsID, color) => {
        return fetch('https://box.dev.leader.codes/api/' + userName + '/tag/editTags', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authentication": jwt
            },
            body: JSON.stringify({
                "tagsList": tagsID,
                "color": color
            })
        }).then(res => { return res.json() }).then((result) => {
            console.log(result);
            return result
        }, (error) => {

            console.log(error)
            return error.message
        })
    }
}

export default new tagService()

