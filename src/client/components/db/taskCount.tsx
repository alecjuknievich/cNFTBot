import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";


export function TaskCount() {
    const tasks = useLiveQuery(
        () => db.tasks
            .count()
    );

    if (!tasks) return (
        <>0</>
    );;



    return (
            <>{tasks}</>
    );
};



export default TaskCount;
