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

    async getLoginToken(isHeadLess, email, pw, taskId) {
        return new Promise(async (resolve, reject) => {
            this.frontEndMessage('Creating Browser...', taskId, 'info', false);
            let link = 'https://cnft.io/login';
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
            await page.fill('input:below(:text("Email Address"))', email);
            await page.fill('input:below(:text("Password"))', pw);
            await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                grecaptcha.ready(function() {
                    // eslint-disable-next-line no-undef
                    grecaptcha.execute().then(function(token) {
                        console.log(token);
                    });
                });
            });

            async function logRequest(interceptedRequest) {
                interceptedRequest.json().then(async (e) => {
                    if (e.accessToken) {
                        browser.close();
                        resolve(e.accessToken);
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
            reqs.apiCall(`https://api.cnft.io/market/purchase/${cnftID}`, 'POST', {}, {
                authorization: `Bearer: ${account}`
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
                nsfw: false,
                search: policyId,
                sort: {
                    price: 1
                },
                page: 1,
                verified: verified,
                types: ["listing"],
                priceMax: priceLimit * 10 ** 6,
                sold: false,
                priceMin: 0
            }).then((res) => {
                if (res.results.length > 0) {
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
            for (let i = 0; i < listings.length; i++) {
                let listing = listings[i];
                listing.price = listing.price * 10 ** -6;
                if (priceLimit >= listing.price) {
                    snipeListings.push(listing._id);
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
