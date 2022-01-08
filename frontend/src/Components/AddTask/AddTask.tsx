import React, {MouseEventHandler} from 'react';
import './AddTask.css';

interface Props {
  closeModal: MouseEventHandler;
}

interface State {
  taskText: string;
}

export default class AddTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskText: ''
    }
  }
  render() {
    return (
      <form className="addTask__body">
        <button
          className="addTask__closeModal"
          onClick={this.props.closeModal}>
          <span className="visually-hidden">The close button for the modal window</span>
        </button>
        <span className="addTask__description">Describe the task you want to add using 1-64 characters</span>
        <textarea className="addTask__taskText" rows={3} placeholder="Type in a new task"></textarea>
        <span className="addTask__warning">Warning</span>
        <button type="submit" className="addTask__submit">Save task</button>
      </form>
    );
  }
}

