import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function ProfileCount() {
    const profiles = useLiveQuery(
        () => db.profiles
            .count()
    );

    if (!profiles) return (
        <>0</>
    );;

    return (
        <>{profiles}</>
    );
};

export default ProfileCount;
