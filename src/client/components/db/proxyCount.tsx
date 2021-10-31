import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function ProxyCount() {
    const proxies = useLiveQuery(
        () => db.proxies
            .count()
    );

    if (!proxies) return (
        <>0</>
    );;

    return (
        <>{proxies}</>
    );
};

export default ProxyCount;
