import React from "react";
import ItemTask from '../ItemTask/ItemTask';
import NoItems from '../NoItems/NoItems';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

interface Props {}

interface State {
  tasks: Task[];
}

export default class ImportantTasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    fetch('/completedTasks')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data
        })
      });
  }

  changeTaskProperty = (object: Task) => {
    console.log('Common state before');
    console.log(this.state)
    console.log('Object received:')
    console.log(object);
    const updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === +object.id) {
        updatedTasks[i] = object;
        break;
      }
    }
    this.setState({tasks: updatedTasks});
    console.log('Common state after');
    console.log(this.state)
  }

  render() {
    console.log('Completed rendering')
    return (
      <div>{this.state.tasks.length > 0 ? this.state.tasks.map(item => <ItemTask
        key={item.id}
        task={item}
        changeTaskProperty={this.changeTaskProperty}/>) : <NoItems/>}
      </div>
    )
  }
}