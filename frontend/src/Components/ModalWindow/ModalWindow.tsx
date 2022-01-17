import React, {useEffect, useState} from 'react';
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
  const [modalWindowWarningText, setModalWindowWarningText] = useState('');
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

  useEffect(() => {
    if (isNewTaskTextValid()) {
      setModalWindowWarningText('Your text is fine 😎');
    } else {
      setModalWindowWarningText(`Type in 1-64 characters. Currently you typed in ${modalWindowTaskText.length}`);
    }
  }, [modalWindowTaskText])

  function saveTaskTextAndValidate(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    saveNewTaskTextToRedux(evt);

  }

  function isNewTaskTextValid(): boolean {
    return modalWindowTaskText.length >= MIN_TEXT_LENGTH && modalWindowTaskText.length <= MAX_TEXT_LENGTH;
  }

  function closeModalWindow() {
    dispatch({type: 'setModalWindowTaskText', modalWindowTaskText: ''});
    dispatch({type: 'setModalWindowTaskId', modalWindowTaskText: null});
    dispatch({type: 'setModalWindowAction', modalWindowAction: null})
    dispatch({type: 'closeModalWindow'});
  }

  function saveEditedTaskOnServer(id: string, taskText: string) {
    fetch(`/tasks/${id}`, {
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
        updateTaskPropertyInRedux(object);
      })
      .catch(err => console.log(err));
  }

  function saveNewTaskOnServer(taskText: string) {
    fetch(`/tasks/newTask`, {
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
  }

  function setModalWindowButtonText() {
    if (modalWindowAction === 'editTask') {
      return 'Save edited task';
    } else if (modalWindowAction === 'createTask') {
      return 'Save new task';
    }
  }

  function setModalWindowCaptionText() {
    if (modalWindowAction === 'editTask') {
      return 'Edit the task using 1-64 characters';
    } else if (modalWindowAction === 'createTask') {
      return 'Describe the task you want to add using 1-64 characters';
    }
  }
  
  function chooseButtonActionAndRun() {
    if (isNewTaskTextValid()) {
      if (modalWindowAction === 'editTask') {
        saveEditedTaskOnServer(modalWindowTaskId, modalWindowTaskText);
      } else if (modalWindowAction === 'createTask') {
        saveNewTaskOnServer(modalWindowTaskText);
      }
      closeModalWindow();
    }
  }

  return (
    <div className="ModalWindow__background">
      <form className="ModalWindow__body">
        <button
          className="ModalWindow__closeModal"
          onClick={closeModalWindow}>
          <span className="visually-hidden">The close button for the modal window</span>
        </button>
        <span className="ModalWindow__description">{setModalWindowCaptionText()}</span>
        <textarea
          onChange={saveTaskTextAndValidate}
          className="ModalWindow__taskText"
          rows={3}
          placeholder="Type in a new task"
          defaultValue={modalWindowTaskText}/>
        <span className={isNewTaskTextValid() ? "ModalWindow__warning" : "ModalWindow__warning ModalWindow__warning--error"}>
          {modalWindowWarningText}
        </span>
        <button
          type="button"
          className="ModalWindow__submit"
          onClick={chooseButtonActionAndRun}
          disabled={!isNewTaskTextValid()}>
          {setModalWindowButtonText()}
        </button>
      </form>
    </div>
  )
}

