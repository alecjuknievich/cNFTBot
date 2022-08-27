const axios = require('axios');

class Requests {
    constructor(config={}) {
    }

    async apiCall(url, method, body = {}, header={}) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                data: body,
                headers: header
            }).then((res) => {
                resolve(res.data);
            }).catch((e) => {
                reject(e);
            })
        })

    }
}

module.exports=Requests
