import React, {MouseEventHandler} from 'react';
import AllTasks from './AllTasks/AllTasks';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import ImportantTasks from './ImportantTasks/ImportantTasks';
import './Main.css';
import {Routes, Route} from "react-router-dom";

interface Props {
  openModal: MouseEventHandler;
}

export default class Main extends React.Component<Props> {
  render() {
    return (
      <ul className="taskList">
        <Routes>
          <Route
            path="/allTasks"
            element={<AllTasks openModal={this.props.openModal}/>}/>
          <Route
            path="/importantTasks"
            element={<ImportantTasks/>}/>
          <Route
            path="/completedTasks"
            element={<CompletedTasks/>}/>
        </Routes>
      </ul>
    );
  }
}

