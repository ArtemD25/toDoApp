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
    fetch('/importantTasks')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data
        })
      });
  }

  updateCompletedStatus = (id: number, updatedStatus: boolean) => {
    console.log('Important state before');
    console.log(this.state)
    const updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === id) {
        updatedTasks[i].completed = updatedStatus;
        break;
      }
    }
    this.setState({tasks: updatedTasks});
    console.log('Important state after');
    console.log(this.state)
  }

  updateImportantStatus = (id: number, updatedStatus: boolean) => {
    console.log('Important state before');
    console.log(this.state.tasks)
    console.log(`New status to be set: ${updatedStatus}`)
    const updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === id) {
        updatedTasks[i].important = updatedStatus;
        break;
      }
    }
    this.setState({tasks: updatedTasks});
    console.log('Important state after');
    console.log(this.state.tasks)
    console.log(`New status: ${this.state.tasks[0].important}`)
  }

  render() {
    console.log('Important rendering')
    return (
      <div>{this.state.tasks.length > 0 ? this.state.tasks.map(item => <ItemTask
        key={item.id}
        task={item}
        updateCompletedStatus={this.updateCompletedStatus}
        updateImportantStatus={this.updateImportantStatus}/>) : <NoItems/>}
      </div>
    )
  }
}