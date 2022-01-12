import React from 'react';
import './ItemTask.css';

interface Props {
  task: {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
  },
  changeTaskProperty: Function;
}

export default class ItemTask extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      completed: props.task.completed,
      important: props.task.important
    }
  }

  changeCompletedStatus = (): void => {
    fetch(`/tasks/${this.props.task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !this.props.task.completed
      })
    })
    .then(response => response.json())
    .then(object => {
      console.log('Received object')
      console.log(object)
      this.props.changeTaskProperty(object)
    })
      .catch(err => console.log('Error occurred'));
  }

  changeImportantStatus = (): void => {
    fetch(`/tasks/${this.props.task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        important: !this.props.task.important
      })
    })
      .then(response => response.json())
      .then(object => {
        console.log('Received object')
        console.log(object)
        this.props.changeTaskProperty(object)
      })
      .catch(err => console.log('Error occurred'));
  }

  deleteTask = () => {
    fetch(`/tasks/${this.props.task.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(object => {
        console.log('Response to request to delete a task');
        console.log(object);
      });
  }

  render() {
    return (
      <li className="ItemTask__container">
        <button
          className={`ItemTask__circleSign ${this.props.task.completed ? 'ItemTask__circleSign--completed' : null}`}
          onClick={this.changeCompletedStatus}
          type="button">
          <span className="visually-hidden">A button allowing to mark / unmark a task to be done</span>
        </button>
        <span
          className={`ItemTask__taskText ${this.props.task.completed ? 'ItemTask__taskText--completed' : null}`}>
          {this.props.task.text}</span>
        <ul className="ItemTask__actions">
          <li className="ItemTask__action">
            <button className="ItemTask__button ItemTask__button--edit">
              <svg viewBox="0 0 512 512">
                <path fill="#7c7c7c"
                  d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
              </svg>
              <span className="visually-hidden">Edit task button</span>
            </button>
          </li>
          <li className="ItemTask__action">
            <button
              className={`ItemTask__button ItemTask__button--star ${this.props.task.important ? 'ItemTask__button--starOn' : null}`}
              onClick={this.changeImportantStatus}>
              <svg viewBox="0 0 576 512">
                <path fill="#7c7c7c"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
              </svg>
              <span className="visually-hidden">Mark task as important button</span>
            </button>
          </li>
          <li className="ItemTask__action">
            <button
              className="ItemTask__button ItemTask__button--delete"
              onClick={this.deleteTask}>
              <svg viewBox="0 0 448 512">
                <path fill="#7c7c7c"
      d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
              </svg>
              <span className="visually-hidden">Delete task button</span>
            </button>
          </li>
        </ul>
      </li>
    );
  }
}

