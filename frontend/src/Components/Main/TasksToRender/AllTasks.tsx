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
  filteredTasksToShow: Task[]
}

export default function AllTasks(props: Props) {
  const dispatch = useDispatch();
  const filteredTasksToShow = useSelector((state: State) => state.filteredTasksToShow);
  console.log(`url: ${props.url}`)

  useEffect(() => {
    getTasksArrayFromServer();
  }, []);

  function toggleLoader(shallLoaderBeShown: boolean) {
    dispatch(actions.setLoaderVisibility(shallLoaderBeShown));
  }

  function getTasksArrayFromServer() {
    toggleLoader(true);
    fetch(`/${props.url}`)
      .then(response => response.json())
      .then(tasksArray => {
        console.log('Tasks array')
        console.log(tasksArray);
        dispatch(actions.setFilteredTasksToShow(tasksArray.tasks));
      })
      .catch(err => console.log(err))
      .finally(() => toggleLoader(false));
  }

  return (
    <div>
      {props.isAddNewTaskButtonVisible && <ItemNew/>}
      {(filteredTasksToShow && filteredTasksToShow.length) > 0 ? filteredTasksToShow.map(task => <ItemTask
        key={task.id}
        task={task}/>) : <NoItems/>}
      </div>
  )
}