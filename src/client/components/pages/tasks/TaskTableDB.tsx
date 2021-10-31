import {
    Table,
    TableBody,
    TableBodyRow,
    TableBodyRowWrapper,
    TableBodyCell,
    TableHeader,
    TableHeaderRow,
    TableHeaderCell
} from "../../global/Table";
import AutoSizer from 'react-virtualized-auto-sizer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useMemo} from "react";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../db/db";
import {startTasks, stopTasks} from '../../global/workers';
import * as _ from "lodash";

import {
    faPlayCircle,
    faTrash,
    faStopCircle
} from "@fortawesome/free-solid-svg-icons";
import theme from "../../theme";


type TaskTableProps = {
    data: any;
};

type RowProps = {
    index: number;
    style: React.CSSProperties | undefined;
};

export interface taskStatus {
    id?: number;
    action: string;
}

function deleteTask(task: any) {
    stopTasks(task);
    db.tasks.delete(task.id);
}




export const TaskTable: any = ({data}: TaskTableProps) => {

    const tasks = useLiveQuery(
        () => db.tasks
            .toArray()
    );

    if (!tasks) return null;

    const Row = ({index, style}: RowProps) => {
        let t = tasks[index];
        let project = t.policyId;
        if (t.project) {
            project=t.project;
        }
        let status = '';
        let color = theme.text;
        useMemo(() => {
            if (_.find(data, {'id': t.id})) {
                // eslint-disable-next-line
                status =  _.find(data, {'id': t.id}).action;
            } else {
                status = 'Idle.'
            }

            if (_.find(data, {'id': t.id})) {
                        // eslint-disable-next-line
                        let statusType = _.findLast(data, {'id': t.id}).type;
                        switch (statusType) {
                            case 'error':
                                // eslint-disable-next-line
                                color = theme.error;
                                break;
                            case 'info':
                                // eslint-disable-next-line
                                color = theme.text;
                                break;
                            case 'warn':
                                // eslint-disable-next-line
                                color = theme.warn;
                                break;
                            case 'success':
                                // eslint-disable-next-line
                                color = theme.success;
                                break;
                        }
                    }
        }, [t.id]);

        return (
            <TableBodyRowWrapper key={t.id} style={style}>
                <TableBodyRow>
                    <TableBodyCell style={{flex: '0 0 10%'}}>{t.site}</TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 10%'}}>{t.mode}</TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 10%'}}>{t.profile}</TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 10%'}}>{t.priceLimit}</TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 20%'}}>{project}</TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 30%', color: color}}><strong>{status}</strong></TableBodyCell>
                    <TableBodyCell style={{flex: '0 0 10%'}}>
                        <FontAwesomeIcon
                            style={{margin: "0 0.25em", color: theme.success}}
                            icon={faPlayCircle}
                            onClick={() => startTasks(t)}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                            style={{margin: "0 0.25em", color: theme.error}}
                            icon={faStopCircle}
                            onClick={() => (stopTasks(t))}
                        ></FontAwesomeIcon>
                        {/*<FontAwesomeIcon*/}
                        {/*    style={{margin: "0 0.25em", color: theme.warn}}*/}
                        {/*    icon={faPencilAlt}*/}
                        {/*    onClick={() => ()}*/}
                        {/*></FontAwesomeIcon>*/}
                        <FontAwesomeIcon
                            style={{margin: "0 0.25em", color: theme.info}}
                            icon={faTrash}
                            onClick={() => deleteTask(t)}
                        ></FontAwesomeIcon>

                    </TableBodyCell>
                </TableBodyRow>
            </TableBodyRowWrapper>
        );
    };


    return (

        <Table className="TABLE">

            <TableHeader>
                <TableHeaderRow>
                    <TableHeaderCell style={{flex: '0 0 10%'}}>Store</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 10%'}}>Mode</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 10%'}}>Profile</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 10%'}}>Price Limit</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 20%'}}>Project</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 30%'}}>Status</TableHeaderCell>
                    <TableHeaderCell style={{flex: '0 0 10%'}}>Options</TableHeaderCell>
                </TableHeaderRow>
            </TableHeader>

            <AutoSizer className="AUTO_SIZER">

                {({height, width}) => (
                    <TableBody className="TABLE_BODY" height={height * 0.87} itemCount={tasks?.length} itemSize={52}
                               width={width}>
                        {Row}
                    </TableBody>
                )}

            </AutoSizer>
        </Table>
    );

};


export default TaskTable;
