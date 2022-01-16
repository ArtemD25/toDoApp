import React from 'react';
import './ModalWindow.css';
import {useDispatch, useSelector} from "react-redux";

interface State {
  modalWindowTaskText: string;
  modalWindowAction: string;
  modalWindowTaskId: string;
  filteredTasksToShow: Task[];
}

interface Task {
  [key: string]: number | string | boolean;

  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

export default function ModalWindow() {
  const dispatch = useDispatch();
  const modalWindowTaskText = useSelector((state: State) => state.modalWindowTaskText);
  const modalWindowTaskId = useSelector((state: State) => state.modalWindowTaskId);
  const modalWindowAction = useSelector((state: State) => state.modalWindowAction);
  const filteredTasksToShow = useSelector((state: State) => state.filteredTasksToShow);
  const MIN_TEXT_LENGTH = 1;
  const MAX_TEXT_LENGTH = 64;

  function saveNewTaskTextToRedux(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({type: 'setModalWindowTaskText', modalWindowTaskText: evt.target.value})
  }

  function isNewTaskTextValid(): boolean {
    return modalWindowTaskText.length >= MIN_TEXT_LENGTH && modalWindowTaskText.length <= MAX_TEXT_LENGTH;
  }

  function closeModalWindow() {
    if (isNewTaskTextValid()) {
      console.log("text is valid");
      dispatch({type: 'setModalWindowTaskText', modalWindowTaskText: ''});
      dispatch({type: 'setModalWindowTaskId', modalWindowTaskText: null});
      dispatch({type: 'setModalWindowAction', modalWindowAction: null})
      dispatch({type: 'closeModalWindow'});
    }
  }

  function putEditedTaskToServer(id: string, taskText: string) {
    return fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: taskText
      })
    })
      .then(response => response.json())
      .then(object => {
        // console.log(`Received object from server: ${object}`)
        // console.log(object)
        updateTaskPropertyInRedux(object);
      })
      .catch(err => console.log(err));
  }

  function putNewTaskToServer(taskText: string) {
    return fetch(`/tasks/addNewTask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: taskText
      })
    })
      .then(response => response.json())
      .then(object => {
        // console.log(`Received object from server: ${object}`)
        // console.log(object)
        updateTaskPropertyInRedux(object);
      })
      .catch(err => console.log(err));
  }

  function updateTaskPropertyInRedux(updatedTask: Task) {
    if (modalWindowAction === 'editTask') {
      const updatedTasks = JSON.parse(JSON.stringify(filteredTasksToShow));
      for (let i = 0; i < updatedTasks.length; i++) {
        if (+updatedTasks[i].id === +updatedTask.id) {
          updatedTasks[i] = updatedTask;
          dispatch({type: 'setFilteredTasksToShow', filteredTasksToShow: updatedTasks});
          break;
        }
      }
    } else if (modalWindowAction === 'createTask') {
      dispatch({type: 'setFilteredTasksToShow', filteredTasksToShow: [...filteredTasksToShow, updatedTask]});
    }

    closeModalWindow();
  }

  return (
    <div className="ModalWindow__background">
      <div className="ModalWindow__body">
        <button
          className="ModalWindow__closeModal"
          onClick={() => dispatch({type: 'closeModalWindow'})}>
          <span className="visually-hidden">The close button for the modal window</span>
        </button>
        <span className="ModalWindow__description">Describe the task you want to add using 1-64 characters</span>
        <textarea
          onChange={saveNewTaskTextToRedux}
          className="ModalWindow__taskText"
          rows={3}
          placeholder="Type in a new task" defaultValue={modalWindowTaskText}></textarea>
        <span className="ModalWindow__warning">Warning</span>
        <button
          type="button"
          className="ModalWindow__submit"
          onClick={() => {
            if (modalWindowAction === 'editTask') {
              putEditedTaskToServer(modalWindowTaskId, modalWindowTaskText);
            } else if (modalWindowAction === 'createTask') {
              putNewTaskToServer(modalWindowTaskText);
            }
            closeModalWindow()
          }}>
          {modalWindowAction === 'editTask' ? 'Save edited task' : 'Save new task'}
        </button>
      </div>
    </div>
  )
}

