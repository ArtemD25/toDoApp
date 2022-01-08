import React, {MouseEventHandler} from 'react';
import './ItemNew.css';

interface Props {
  openModal: MouseEventHandler;
}

export default class ItemNew extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <li
        className="ItemNew__container"
        onClick={this.props.openModal}>
        <span className="ItemNew__plusSign">
          <span className="visually-hidden">A plus sign showing this list item can add a new task</span>
        </span>
        <span className="ItemNew__taskText">Add a task</span>
      </li>
    );
  }
}

