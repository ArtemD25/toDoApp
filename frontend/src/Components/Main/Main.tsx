import React from 'react';
import AllTasks from './AllTasksToRender/AllTasks';
import ImportantTasks from './AllTasksToRender/ImportantTasks';
import CompletedTasks from './AllTasksToRender/CompletedTasks';
import './Main.css';
import {Routes, Route} from "react-router-dom";

export default function Main() {

  return (
    <ul className="taskList">
      <Routes>
        <Route
          path="/allTasks"
          element={<AllTasks
            isAddNewTaskButtonVisible={true}
            url="getAllTasks"/>}/>
        <Route
          path="/importantTasks"
          element={<ImportantTasks
            isAddNewTaskButtonVisible={false}
            url="getImportantTasks"/>}/>
        <Route
          path="/completedTasks"
          element={<CompletedTasks
            isAddNewTaskButtonVisible={false}
            url="getCompletedTasks"/>}/>
      </Routes>
    </ul>
  )
}

