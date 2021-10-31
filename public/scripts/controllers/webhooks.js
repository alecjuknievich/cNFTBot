const Requests = require('../utils/requests');
const reqs = new Requests({})

class Webhooks {

    constructor(config={}) {
    }

    successWebhook(url, id) {
        reqs.apiCall(url, 'POST', {
            embeds: [{
                color: 3313216,
                timestamp: new Date(),
                author: {
                    name: 'NFT Reserved',
                },
                fields: [
                    {
                        name: "cNFT.io ID:",
                        value: `|| ${id} ||`
                    },
                    {
                        name: "Link to buy:",
                        value: `https://cnft.io/buy.php?s=${id}`
                    }
                ]
            }]
        });
    }

}

module.exports=Webhooks
