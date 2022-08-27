import React, {useMemo, useState} from 'react';
import {
  faTimesCircle,
  faPlayCircle,
  faPlus,
    faStopCircle
} from "@fortawesome/free-solid-svg-icons";
import theme from '../../theme';
import Button from "../../global/Button";
import SideBar from '../../global/SideBar';
import TitleBar from '../../global/TitleBar';
import TopBar, { CounterWrapper, PrimaryControls, SecondaryControls } from "../../global/TopBar";
// import TextInput from '../../global/TextInput';
import NewTaskModal from './NewTaskModal';
import {TaskCount} from "../../db/taskCount";
import {deleteAllTasks} from "../../db/db";
import {startAll, stopAll} from "../../global/workers"
import TaskTable from "./TaskTableDB";
import ContentWrapper from "../../global/ContentWrapper";
import * as _ from "lodash";
import AppControls from "../../global/AppControls";

const electron = window.require("electron");

const Tasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState([]);
  localStorage.removeItem('statuses');

  function toggleTaskModal() {
    setShowTaskModal(!showTaskModal);

  }

  async function deleteAll() {
    await stopAll();
    await stopAll();
    await deleteAllTasks();
  }

  // function toggleEditModal() {
  //   setShowUpdateModal(!showUpdateModal);
  //
  // }

  React.useEffect(function setupListener() {
    // @ts-ignore
    electron.ipcRenderer.on('task-status', (event, arg) => {
      setTaskStatuses(arg);

    });
    return function cleanupListener() {
      if (taskStatuses.length > 0) {
        localStorage.setItem('statuses', JSON.stringify(taskStatuses));
      }
      electron.ipcRenderer.removeAllListeners('task-status');
    }
  })

  let statuses = localStorage.getItem('statuses')
  if (JSON.parse(statuses as string) != null) {
    if (statuses != null && taskStatuses.length < 1) {
      setTaskStatuses(JSON.parse(statuses));
    }
  }

  const cartCount = useMemo(() => {
    if (_.find(taskStatuses, {'cart': true})) {
      let carts: any[] = [];
      taskStatuses.map((task) => {
        // @ts-ignore
        // eslint-disable-next-line
        if (task.cart) {
          return carts.push(task)
        }
        return 'nope';
      })
      // @ts-ignore
      // eslint-disable-next-line
      return <>{carts.length}</>
    } else {
      return 0
    }
  }, [taskStatuses]);

  const successCount = useMemo(() => {
    if (_.find(taskStatuses, {'action': 'Success!'})) {
      let success: any[] = [];
      // @ts-ignore
      // eslint-disable-next-line
      taskStatuses.map((task) => {
        // @ts-ignore
        // eslint-disable-next-line
        if (task.action === 'Success!') {
          return success.push(task)
        }
        return 'nope'
      });
      // @ts-ignore
      // eslint-disable-next-line
      return <>{success.length}</>
    } else {
      return 0
    }
  }, [taskStatuses]);

  return (
    <>
      <SideBar page="tasks" />
      <TitleBar />
      <TopBar>
        <CounterWrapper> <TaskCount /> Tasks | {cartCount} Carted | {successCount} Success</CounterWrapper>
        <PrimaryControls>
          <Button style={{ maxWidth: '2em'}} onClick={toggleTaskModal} icon={faPlus} color={theme.success}/>
          {/*<Button style={{ maxWidth: '2em'}} icon={faRedo} color={theme.info} onClick={() => {electron.ipcRenderer.send('open-captcha-harvester', 'open')}}/>*/}
          {/*<Button style={{ maxWidth: '2em'}} onClick={toggleEditModal} icon={faEdit} color={theme.warn}/>*/}
          {/*<TextInput secondary type="number" placeholder="Monitor Delay (ms)" />*/}
          <Button icon={faPlayCircle} color={theme.success} onClick={startAll} text="Start All"/>
          <Button icon={faStopCircle} color={theme.warn} onClick={stopAll} text="Stop All"/>
          <Button icon={faTimesCircle} color={theme.error} onClick={deleteAll} text="Delete All"/>
        </PrimaryControls>
        <SecondaryControls>
          <AppControls />
        </SecondaryControls>
      </TopBar>
      <ContentWrapper>
        <TaskTable data={taskStatuses.map((task) => {return task})}/>
      </ContentWrapper>
      { showTaskModal && <NewTaskModal toggleModal={toggleTaskModal} />}
    </>
  )
};

export default Tasks;
