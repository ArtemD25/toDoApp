import React from 'react';
import './ItemTask.css';
import {useDispatch, useSelector} from "react-redux";
import {actions} from '../../../../store/redux.js';

interface Props {
  task: {
    [key: string]: number | string | boolean
    id: number;
    text: string;
    is_completed: boolean;
    is_important: boolean;
  }
}

interface Task {
  [key: string]: number | string | boolean;
  id: number;
  text: string;
  is_completed: boolean;
  is_important: boolean;
}

interface State {
  text: string;
  is_completed: boolean;
  is_important: boolean;
  filteredTasksToShow: Task[];
}

export default function ItemTask(props: Props) {
  const dispatch = useDispatch();
  const filteredTasksToShow = useSelector((state: State) => state.filteredTasksToShow);

  function toggleLoader(shallLoaderBeShown: boolean) {
    dispatch(actions.setLoaderVisibility(shallLoaderBeShown));
  }

  const openModalWindow = () => {
    dispatch(actions.setModalWindowAction('editTask'));
    dispatch(actions.setModalWindowTaskText(props.task.text));
    dispatch(actions.setModalWindowTaskId(props.task.id));
    dispatch(actions.setModalWindowVisibility(true));
  }

  function changeTaskProperty(evt: React.MouseEvent<HTMLButtonElement>) {
    toggleLoader(true);
    const propertyToChange = evt.currentTarget.getAttribute('data-property');
    fetch(`/api/tasks/${props.task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // @ts-ignore
        [propertyToChange]: !props.task[propertyToChange]
      })
    })
      .then(response => response.json())
      .then(object => {
        updateTaskPropertyInRedux(object);
      })
      .catch(err => console.log(err))
      .finally(() => toggleLoader(false));
  }

  function deleteTask() {
    if (!window.confirm('Do you really wanna delete this task?')) return;

    toggleLoader(true);
    fetch(`/api/tasks/${props.task.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(taskObject => {
        deleteTaskInRedux(+taskObject.id);
      })
      .catch(err => console.log(err))
      .finally(() => toggleLoader(false));
  }

  function deleteTaskInRedux(taskId: number) {
    const updatedTasks = JSON.parse(JSON.stringify(filteredTasksToShow))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === +taskId) {
        updatedTasks.splice(i, 1);
        break;
      }
    }
    dispatch(actions.setFilteredTasksToShow(updatedTasks));
  }

  function updateTaskPropertyInRedux(updatedTask: Task) {
    console.log('updateTaskPropertyInState')
    const updatedTasks = JSON.parse(JSON.stringify(filteredTasksToShow))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === +updatedTask.id) {
        updatedTasks[i] = updatedTask;
        break;
      }
    }
    dispatch(actions.setFilteredTasksToShow(updatedTasks));
    dispatch(actions.setModalWindowVisibility(false));
  }

  return (
    <li className="ItemTask__container">
      <button
        className={`ItemTask__circleSign ${props.task.is_completed ? 'ItemTask__circleSign--completed' : null}`}
        onClick={changeTaskProperty}
        data-property="is_completed"
        type="button"
        aria-label="A button allowing to mark / unmark a task to be done"
        title="Mark task completed">
      </button>
      <span
        className={`ItemTask__taskText ${props.task.is_completed ? 'ItemTask__taskText--completed' : null}`}>
        {props.task.text}</span>
      <ul className="ItemTask__actions">
        <li className="ItemTask__action">
          <button
            className="ItemTask__button ItemTask__button--edit"
            onClick={openModalWindow}
            aria-label="Edit task button"
            title="Edit task">
            <svg viewBox="0 0 512 512">
              <path fill="#7c7c7c"
                d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
            </svg>
          </button>
        </li>
        <li className="ItemTask__action">
          <button
            className={`ItemTask__button ItemTask__button--star ${props.task.is_important ? 'ItemTask__button--starOn' : null}`}
            onClick={changeTaskProperty}
            data-property="is_important"
            aria-label="Mark task as important button"
            title="Mark task important">
            <svg viewBox="0 0 576 512">
              <path fill="#7c7c7c"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </button>
        </li>
        <li className="ItemTask__action">
          <button
            className="ItemTask__button ItemTask__button--delete"
            onClick={deleteTask}
            aria-label="Delete task button"
            title="Delete task">
            <svg viewBox="0 0 448 512">
              <path fill="#7c7c7c"
                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
            </svg>
          </button>
        </li>
      </ul>
    </li>
)
}

