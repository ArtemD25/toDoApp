import React, {useEffect} from "react";
import ItemNew from "./ItemNew/ItemNew";
import ItemTask from './ItemTask/ItemTask';
import NoItems from './NoItems/NoItems';
import {useDispatch, useSelector} from "react-redux";
import {actions} from '../../../store/redux.js';

interface Task {
  [key: string]: number | string | boolean;
  id: number;
  text: string;
  is_completed: boolean;
  is_important: boolean;
}

interface Props {
  isAddNewTaskButtonVisible: boolean;
  url: string;
}

interface State {
  tasks: Task[];
  isModalSubmitFired: boolean;
  filteredTasksToShow: Task[];
  appPageOpened: string;
}

export default function TasksToRender(props: Props) {
  const dispatch = useDispatch();
  const filteredTasksToShow = useSelector((state: State) => state.filteredTasksToShow);
  const appPageOpened = useSelector((state: State) => state.appPageOpened);

  // A flag for useEffect to rerender the element
  dispatch(actions.setAppPageOpened(props.url));

  useEffect(() => {
    getTasksArrayFromServer();
  }, [appPageOpened]);

  function toggleLoader(shallLoaderBeShown: boolean) {
    dispatch(actions.setLoaderVisibility(shallLoaderBeShown));
  }

  function getTasksArrayFromServer() {
    toggleLoader(true);
    fetch(`http://localhost:3001/tasks/${props.url}`)
      .then(async (response) => {
        const jsonFromServer = await response.json();
        if (response.ok) {
          return jsonFromServer;
        }
        throw new Error(jsonFromServer.error);
      })
      .then(tasksArray => {
        dispatch(actions.setFilteredTasksToShow(tasksArray.tasks));
      })
      .catch(err => console.log(err))
      .finally(() => toggleLoader(false));
  }

  return (
    <React.Fragment>
      {props.isAddNewTaskButtonVisible && <ItemNew/>}
      {(filteredTasksToShow && filteredTasksToShow.length) > 0 ? filteredTasksToShow.map(task => <ItemTask
        key={task.id}
        task={task}/>) : <NoItems/>}
    </React.Fragment>
  )
}