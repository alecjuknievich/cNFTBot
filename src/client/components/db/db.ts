import Dexie, { Table } from "dexie";
import {newTask, profile, proxyList}  from "./interfaces";

export class TasksDB extends Dexie {
    tasks!: Table<newTask, number>;
    profiles!: Table<profile, number>;
    proxies!: Table<proxyList, number>;
    constructor(
    ) {
        super("TasksDB");
        this.version(4).stores({
            tasks: "++id",
            profiles: "++id",
            proxies: "++id"
        });
    }
}

export const db = new TasksDB();

export async function resetDatabase() {
    return db.transaction("rw", db.tasks, async () => {
        await Promise.all(db.tables.map(table => table.clear())).catch((e) => {console.log(e)});
    });
}

export async function addProxyList(proxyList: string, listName: string) {
    let lastProxy = await db.proxies.orderBy('id').last();
    let id = lastProxy?.id || 0;
    let parsedProxyList: any = []
    proxyList.trim().split("\n").map((proxy) => {
        return parsedProxyList.push({
            proxy: proxy,
            status: "New"
        })
    })
    const newProxyList: proxyList = {
        id: id +1,
        name: listName,
        data: parsedProxyList

    }
    db.proxies.add(newProxyList)
}

export function deleteAllTasks() {
    return db.tasks.clear();
};

export function deleteAllProfiles() {
    return db.profiles.clear();
};

export async function deleteTask(i: number) {
    await db.tasks.delete(i);
    return 'success';
};



