import React from 'react';
import TasksToRender from './TasksToRender/TasksToRender';
import './Main.css';
import {Routes, Route} from "react-router-dom";

export default function Main() {

  return (
    <ul className="taskList">
      <Routes>
        <Route
          path="/static/allTasks"
          element={<TasksToRender
            isAddNewTaskButtonVisible={true}
            url="all"/>}/>
        <Route
          path="/static/importantTasks"
          element={<TasksToRender
            isAddNewTaskButtonVisible={false}
            url="important"/>}/>
        <Route
          path="/static/completedTasks"
          element={<TasksToRender
            isAddNewTaskButtonVisible={false}
            url="completed"/>}/>
      </Routes>
    </ul>
  )
}

