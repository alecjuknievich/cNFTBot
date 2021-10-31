const Requests = require('../utils/requests');
const playwright = require('playwright');
const querystring = require('querystring');
const {_} = require('lodash');
const reqs = new Requests({})
let messages = require('../messages');

class CnftTools {

    constructor(config = {}) {
    }

    async monitor(monitorInput) {
        return new Promise(async (resolve, reject) => {
            if (monitorInput) {
                const params = querystring.stringify(monitorInput.parameters);
                const url = `https://cnft.tools/api/${monitorInput.project}?sort=ASC&method=price&priceonly=y&${params}`;
                try {
                    let listings = await reqs.apiCall(url, 'get');
                    const parsedListings = []
                    for (let i = 0; i < listings.stats.length; i++) {
                        let listing = listings.stats[i];
                        listing.price = listing.price * 10 ** -6;
                        if (monitorInput.priceLimit > listing.price) {
                            parsedListings.push(listing.cnftID);
                        }
                    }

                    if (parsedListings.length > 0) {
                        resolve({account: monitorInput.token, nfts: parsedListings});
                    } else {
                        reject('No listings Under Limit');
                    }
                } catch (e) {
                    console.log(e)
                    reject(e)
                }
            }
        });
    }

    async getLoginToken(isHeadLess, profileString, taskId) {
        return new Promise(async (resolve, reject) => {
            this.frontEndMessage('Creating Browser...', taskId, 'info', false);
            let link = 'https://cnft.io';
            const browser = await playwright['firefox'].launch({
                headless: isHeadLess
            });

            const context = await browser.newContext({
                timezoneId: 'America/New_York'
            });

            await context.grantPermissions(['geolocation']);

            const page = await context.newPage()

            await page.addInitScript(() => {
                const elementDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
                Object.defineProperty(HTMLDivElement.prototype, 'offsetHeight', {
                    ...elementDescriptor,
                    get: function () {
                        if (this.id === 'modernizr') {
                            return 1;
                        }
                        return elementDescriptor.get.apply(this);
                    },
                });

                ['height', 'width'].forEach(property => {
                    const imageDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, property);
                    Object.defineProperty(HTMLImageElement.prototype, property, {
                        ...imageDescriptor,
                        get: function () {
                            if (this.complete && this.naturalHeight == 0) {
                                return 20;
                            }
                            return imageDescriptor.get.apply(this);
                        },
                    });
                });

                const originalQuery = window.navigator.permissions.query;
                return window.navigator.permissions.query = (parameters) => (
                    parameters.name === 'notifications' ?
                        Promise.resolve({state: Notification.permission}) :
                        originalQuery(parameters)
                );

            })

            page.on('response', logRequest)
            await page.goto(link);
            this.frontEndMessage('Logging In...', taskId, 'info', false);
            await page.evaluate((profileString) => {
                login()

                async function login() {

                    fetch("https://api.cnft.io/auth/login", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                            "sec-ch-ua": '\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site"
                        },
                        "referrer": "https://cnft.io/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": profileString,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "omit"
                    }).then((data) => {
                        console.log(data);
                    })
                }
            }, profileString);


            async function logRequest(interceptedRequest) {
                interceptedRequest.json().then(async (e) => {
                    if (e.token) {
                        browser.close();
                        resolve(e.token);
                    } else if (e === 'Invalid Credentials') {
                        reject(e);
                    } else {
                        console.log(e);
                    }
                }).catch(function (e) {
                    // console.log(e);
                });
            }
        });
    }

    reserve(account, cnftID, taskId) {
        try {
            reqs.apiCall('https://api.cnft.io/market/buy', 'POST', {
                token: account,
                listingID: cnftID
            }).then((msg) => {
                this.frontEndMessage('Reserved!', taskId, 'success', false);
                console.log(msg);
            }).catch((e) => {
                this.frontEndMessage('Error Reserving!', taskId, 'error', false);
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }

    reserveSweep(account, cnfts, taskId) {
        try {
            cnfts.map((cnft) => {
                return this.reserve(account, cnft, taskId)
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getTraitList(project) {
        try {
            const url = `https://cnft.tools/api/${project}?traitlist=getList`;
            const traitList = await reqs.apiCall(url, 'GET');
            return traitList;

        } catch (e) {
            console.log(e);
        }
    }

    async getListings(policyId, verified, priceLimit) {
        return new Promise(((resolve, reject) => {
            reqs.apiCall('https://api.cnft.io/market/listings', 'POST', {
                search: policyId,
                sort: 'price',
                page: 1,
                order: 'asc',
                verified: verified,
                pricemax: priceLimit
            }).then((res) => {
                if (res.found > 0) {
                    resolve(res);
                } else {
                    resolve('No results found, Retrying...');
                }
            }).catch((e) => {
                reject(e);
            })
        }))
    }

    parseListings(listings, priceLimit) {
        return new Promise(((resolve, reject) => {
            const snipeListings = [];
            console.log(listings)
            for (let i = 0; i < listings.length; i++) {
                let listing = listings[i];
                listing.price = listing.price * 10 ** -6;
                if (priceLimit >= listing.price && !listing.sold) {
                    snipeListings.push(listing.id);
                }
            }
            if (!_.isNull(snipeListings)) {
                resolve({nfts: snipeListings});
            } else {
                reject('No listings Under Limit');
            }
        }))


    }

    frontEndMessage(message, taskId, type, cart) {
        let newMessage = {'id': taskId, 'action': message, 'type': type, 'cart': cart}
        _.remove(messages, {'id': taskId})
        messages.push(newMessage);
    }


}

module.exports = CnftTools
