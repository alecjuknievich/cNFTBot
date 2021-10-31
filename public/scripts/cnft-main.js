const CnftTools = require('./controllers/cnft');
const Webhooks = require('./controllers/webhooks');



const cnftApi = new CnftTools({});
const webhooks = new Webhooks({});
const { _ } = require('lodash')
let messages = require('./messages');
let runningTasks = require('./runningTasks');

class cnftMain {

    constructor(config = {}) {
    }

    async callMonitor(monitorInput) {
        if (this.runStatus(monitorInput.id)) {
            this.frontEndMessage('Checking listings...', monitorInput.id, 'info', false);
            cnftApi.monitor(monitorInput).then((e) => {
                if (e.nfts) {
                    if (monitorInput.sweep && e.nfts.length > 1 && this.runStatus(monitorInput.id)) {
                        this.frontEndMessage('Listings Found! Sweeping..', monitorInput.id, 'warn', true);
                        cnftApi.reserveSweep(e.account, e.nfts, monitorInput.id);
                        webhooks.successWebhook(monitorInput.webhook, e.nfts);
                    } else {
                        this.frontEndMessage(`Listing Found! Reserving - ${e.nfts[0]}`, monitorInput.id, 'warn', true);
                        cnftApi.reserve(e.account, e.nfts[0], monitorInput.id)
                        webhooks.successWebhook(monitorInput.webhook, e.nfts[0]);
                    }
                }
            }).catch((e) => {
                this.frontEndMessage('No listings Under Limit',monitorInput.id, 'info', false);
                console.log(e)
                setTimeout(() => {
                    this.callMonitor(monitorInput);
                }, monitorInput.monitorDelay);

            });

        }

    };

    async callPolicyIdMonitor(monitorInput) {
        if (this.runStatus(monitorInput.id)) {
            this.frontEndMessage('Checking listings...', monitorInput.id, 'info', false);
            cnftApi.getListings(monitorInput.policyId, monitorInput.verified, monitorInput.priceLimit).then((res) => {
                this.frontEndMessage(`Found ${res.found}!`, monitorInput.id, 'info', false);
                cnftApi.parseListings(res.assets, monitorInput.priceLimit).then((res) => {
                    if (monitorInput.sweep && res.nfts.length > 1 && this.runStatus(monitorInput.id)) {
                        this.frontEndMessage('Sweep Found! Sweeping...', monitorInput.id, 'warn', true);
                        cnftApi.reserveSweep(monitorInput.token, res.nfts, monitorInput.id);
                        webhooks.successWebhook(monitorInput.webhook, res.nfts);
                    } else if (res.nfts.length > 0) {
                        this.frontEndMessage(`Listing Found! Reserving - ${res.nfts[0]}`, monitorInput.id, 'warn', true);
                        cnftApi.reserve(monitorInput.token, res.nfts[0], monitorInput.id);
                        webhooks.successWebhook(monitorInput.webhook, res.nfts[0]);
                    } else {
                        this.frontEndMessage('No listings under limit',monitorInput.id, 'info', false);
                        setTimeout(() => {
                            this.callPolicyIdMonitor(monitorInput);
                        }, monitorInput.monitorDelay);
                    }
                }).catch((e) => {
                    this.frontEndMessage(`No listings found`, monitorInput.id, 'error', false);
                    setTimeout(() => {
                        this.callPolicyIdMonitor(monitorInput);
                    }, monitorInput.monitorDelay);
                })
            }).catch((e) => {
                this.frontEndMessage('No listings under limit',monitorInput.id, 'info', false);
                console.log(e);
                setTimeout(() => {
                    this.callPolicyIdMonitor(monitorInput);
                }, monitorInput.monitorDelay);
            })
        }
    }

    async login(monitorInput) {
        if (this.runStatus(monitorInput.id)) {
            cnftApi.getLoginToken(true, monitorInput.profileString, monitorInput.id).then((token) => {
                if (token && this.runStatus(monitorInput.id)) {
                    this.frontEndMessage('Logged in', monitorInput.id, 'info', false);
                    monitorInput.token = token;
                    if (monitorInput.monitorMode === 'filterFeatures') {
                        this.callMonitor(monitorInput);
                    } else if (monitorInput.monitorMode === 'floorSnipe'){
                        this.callPolicyIdMonitor(monitorInput)
                    }
                }
            }).catch((e) => {
                this.frontEndMessage(`${e}`, monitorInput.id, 'error', false);
            });
        }
    }

    async startTask(monitorInput) {
        this.frontEndMessage('Loading...', monitorInput.id, 'info', false);
        this.login(monitorInput).then((e) => {
            return;
        })
    }

    frontEndMessage(message, taskId, type, cart) {
        let newMessage = {'id': taskId, 'action': message, 'type': type, 'cart': cart}
        _.remove(messages, {'id': taskId})
        messages.push(newMessage);
    }

    runStatus(taskId) {
        let task = _.find(runningTasks, {id: taskId});
        if (task) {
            return _.get(task, 'running')
        } else {
            return false;
        }
    }
}


module.exports = cnftMain
