import React, {useCallback, useEffect} from "react";
import ItemNew from "./ItemNew/ItemNew";
import ItemTask from './ItemTask/ItemTask';
import NoItems from './NoItems/NoItems';
import {useDispatch, useSelector} from "react-redux";

interface Task {
  [key: string]: number | string | boolean;
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
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

  function getTasksArrayFromServer() {
    fetch(`/${props.url}`)
      .then(response => response.json())
      .then(tasksArray => {
        console.log('Tasks array')
        console.log(tasksArray);
        dispatch({type: 'setFilteredTasksToShow', filteredTasksToShow: tasksArray})
      });
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