import React, {MouseEventHandler} from 'react';
import ItemNew from "./ItemNew/ItemNew";
import ItemTask from './ItemTask/ItemTask';
import './Main.css';

interface Props {
  openModal: MouseEventHandler;
}

const json = [
  {
    id: 1,
    text: 'Buy some fish',
    completed: false,
    important: false
  },
  {
    id: 2,
    text: 'Get birthday presents for Carl',
    completed: false,
    important: true
  },
  {
    id: 3,
    text: 'Feed the cat',
    completed: false,
    important: false
  },
]

export default class Main extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul className="taskList">
        <ItemNew openModal={this.props.openModal}/>
        {json.map(item => <ItemTask key={item.id} task={item}/>)}
      </ul>
    );
  }
}

