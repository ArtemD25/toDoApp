import React from 'react';
import TasksToRender from './TasksToRender/TasksToRender';
import './Main.css';
import {Routes, Route} from "react-router-dom";

export default function Main() {

  return (
    <ul className="taskList">
      <Routes>
        <Route
          path="/tasks/all"
          element={<TasksToRender
            isAddNewTaskButtonVisible={true}
            url="all"/>}/>
        <Route
          path="/tasks/important"
          element={<TasksToRender
            isAddNewTaskButtonVisible={false}
            url="important"/>}/>
        <Route
          path="/tasks/completed"
          element={<TasksToRender
            isAddNewTaskButtonVisible={false}
            url="completed"/>}/>
      </Routes>
    </ul>
  )
}

