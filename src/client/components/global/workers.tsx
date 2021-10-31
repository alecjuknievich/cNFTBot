import {db} from "../db/db";
import * as _ from "lodash";
import {newTask} from "../db/interfaces";

const electron = window.require("electron");


export async function startTasks(t: newTask) {

    let profiles = await db.profiles.toArray();
    let userWebhook;
    if (localStorage.getItem('userWebhook') === undefined) {
        userWebhook = "";
    } else {
        userWebhook = localStorage.getItem('userWebhook');
    }
    const sweepStatus = setSweepStatus(t.mode);
    let verifiedStatus = true;
    if (t.verified) {
        verifiedStatus = setVerifiedStatus(t.verified);
    }

    const task: any = {
        id: t.id,
        token: '',
        sweep: sweepStatus,
        profile: _.find(profiles, {'profileName': t.profile}),
        priceLimit: t.priceLimit,
        monitorDelay: t.monitorDelay,
        monitorMode: t.monitorMode,
        project: t.project,
        parameters: t.parameters,
        policyId: t.policyId,
        verified: verifiedStatus,
        webhook: userWebhook
    }

    task.profileString = `email=${encodeURIComponent(task.profile.email)}&password=${encodeURIComponent(task.profile.password)}`
    electron.ipcRenderer.send('start-task', task)

}

export function stopTasks(t: newTask) {
    electron.ipcRenderer.send('stop-task', {id: t.id})

}

function setSweepStatus(mode: string): boolean {
    if (mode === 'sweep') {
        return true;
    } else {
        return false;
    }
}

function setVerifiedStatus(verified: string): boolean {
    if (verified === 'verified') {
        return true;
    } else {
        return false;
    }
}

function chunkArray(array: any, chunk_size: number) {
    let index = 0;
    let arrayLength = array.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = array.slice(index, index + chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}

function getRunningTaskIds(): any {
    return new Promise(((resolve) => {
        let taskIds;
        // @ts-ignore
        electron.ipcRenderer.on('get-running-tasks', (event, arg) => {
            taskIds = arg.map((task: any) => {
                return task.id
            })
            electron.ipcRenderer.removeAllListeners('get-running-tasks');
            resolve(taskIds)
        });
        electron.ipcRenderer.send('call-running-tasks');
    }))
}

export async function startAll() {
    getRunningTaskIds().then( async (taskIds: any) => {
        let profiles = await db.profiles.toArray();
        const savedTasks = await db.tasks.toArray();
        // eslint-disable-next-line
        // @ts-ignore
        const nonRunningTasks = [];
        savedTasks.map((task) => {

            if (_.includes(taskIds, task.id)) {
                return '';
            } else {
                const sweepStatus = setSweepStatus(task.mode);
                let profile = _.find(profiles, {'profileName': task.profile})
                let profileString = ''
                if (profile) {
                    profileString = `email=${encodeURIComponent(profile.email)}&password=${encodeURIComponent(profile.password)}`
                }

                let verifiedStatus = true;
                if (task.verified) {
                    verifiedStatus = setVerifiedStatus(task.verified);
                }

                let userWebhook;
                if (localStorage.getItem('userWebhook') === undefined) {
                    userWebhook = "";
                } else {
                    userWebhook = localStorage.getItem('userWebhook');
                }

                const t = {
                    id: task.id,
                    token: '',
                    sweep: sweepStatus,
                    profile: profile,
                    priceLimit: task.priceLimit,
                    monitorDelay: task.monitorDelay,
                    monitorMode: task.monitorMode,
                    project: task.project,
                    parameters: task.parameters,
                    profileString: profileString,
                    policyId: task.policyId,
                    verified: verifiedStatus,
                    webhook: userWebhook
                };
                nonRunningTasks.push(t);
                return t;
            }
        })



        // @ts-ignore
        // eslint-disable-next-line
        const groups = chunkArray(nonRunningTasks, 100);
        groups.map(async (group) => {
            electron.ipcRenderer.send('start-all', group);
        });


    })

}

export async function stopAll() {
    const savedTasks = await db.tasks.toArray();
    electron.ipcRenderer.send('stop-all', savedTasks)

}

