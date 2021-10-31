import { Table, TableBody, TableBodyRow, TableBodyRowWrapper, TableBodyCell, TableHeader, TableHeaderRow, TableHeaderCell } from "../../global/Table";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";


import {
    faPencilAlt,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import theme from "../../theme";

type ProxyTableProps = {
    style?: React.CSSProperties | undefined;
};


type RowProps = {
    index: number;
    style: React.CSSProperties | undefined;
};

export function ProxyTableDB({style}: ProxyTableProps) {
    const proxies = useLiveQuery(
        () => db.proxies
            .toArray()
    );

    if (!proxies) return null;


    const proxyTable = () => {
        const Row = ({index, style}: RowProps) => {
            const p = proxies[index];
            return (
                <TableBodyRowWrapper key={p.name} style={style}>
                    <TableBodyRow>
                        <TableBodyCell style={{flex: '0 0 25%'}}>{p.id}</TableBodyCell>
                        <TableBodyCell style={{flex: '0 0 25%'}}>{p.name}</TableBodyCell>
                        <TableBodyCell style={{flex: '0 0 25%'}}>{p.data.length}</TableBodyCell>
                        <TableBodyCell style={{flex: '0 0 25%'}}>
                            <FontAwesomeIcon
                                style={{margin: "0 0.25em", color: theme.warn}}
                                icon={faPencilAlt}
                            ></FontAwesomeIcon>
                            <FontAwesomeIcon
                                style={{margin: "0 0.25em", color: theme.info}}
                                icon={faTrash}
                                onClick={() => db.proxies.delete(p.id)}
                            ></FontAwesomeIcon>
                        </TableBodyCell>
                    </TableBodyRow>
                </TableBodyRowWrapper>
            );
        };


        return (
            <Table style={style} className="TABLE">

                <TableHeader>
                    <TableHeaderRow>
                        <TableHeaderCell style={{flex: '0 0 25%'}}>ID</TableHeaderCell>
                        <TableHeaderCell style={{flex: '0 0 25%'}}>Name</TableHeaderCell>
                        <TableHeaderCell style={{flex: '0 0 25%'}}>Amount</TableHeaderCell>
                        <TableHeaderCell style={{flex: '0 0 25%'}}>Options</TableHeaderCell>
                    </TableHeaderRow>
                </TableHeader>

                <AutoSizer className="AUTO_SIZER">
                    {({height, width}) => (
                        <TableBody className="TABLE_BODY" height={height * 0.87} itemCount={proxies?.length} itemSize={52}
                                   width={width}>
                            {Row}
                        </TableBody>
                    )}

                </AutoSizer>

            </Table>
        );
    };
    return proxyTable();

}

export default ProxyTableDB;
