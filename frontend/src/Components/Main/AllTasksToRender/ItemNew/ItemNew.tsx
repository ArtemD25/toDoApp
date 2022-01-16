import React from 'react';
import './ItemNew.css';
import {useDispatch} from "react-redux";

export default function ItemNew() {
  const dispatch = useDispatch()

  const openModalWindow = () => {
    dispatch({type: 'setModalWindowAction', modalWindowAction: 'createTask'});
    // dispatch({type: 'setModalWindowTaskInitialText', modalWindowTaskInitialText: ''});
    dispatch({type: 'showModalWindow'});
  }

  return (
    <li
      className="ItemNew__container"
      onClick={openModalWindow}>
      <span className="ItemNew__plusSign">
        <span className="visually-hidden">A plus sign showing this list item can add a new task</span>
      </span>
      <span className="ItemNew__taskText">Add a task</span>
    </li>
  )
}

