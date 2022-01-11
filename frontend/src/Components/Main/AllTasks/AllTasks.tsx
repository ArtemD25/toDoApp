import React, {MouseEventHandler} from "react";
import ItemNew from "../ItemNew/ItemNew";
import ItemTask from '../ItemTask/ItemTask';
import NoItems from '../NoItems/NoItems';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

interface Props {
  openModal: MouseEventHandler;
}

interface State {
  tasks: Task[];
}

export default class AllTasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    fetch('/allTasks')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data
        })
      });
  }

  updateCompletedStatus = (id: number, updatedStatus: boolean) => {
    console.log('All tasks state before');
    console.log(this.state)
    const updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === id) {
        updatedTasks[i].completed = updatedStatus;
        break;
      }
    }
    this.setState({tasks: updatedTasks});
    console.log('All tasks state after');
    console.log(this.state)
  }

  updateImportantStatus = (id: number, updatedStatus: boolean) => {
    console.log('All tasks state before');
    console.log(this.state)
    const updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))
    for (let i = 0; i < updatedTasks.length; i++) {
      if (+updatedTasks[i].id === id) {
        updatedTasks[i].important = updatedStatus;
        break;
      }
    }
    this.setState({tasks: updatedTasks});
    console.log('All tasks state after');
    console.log(this.state)
  }

  render() {
    console.log('All tasks rendering')
    return (
      <div>
        <ItemNew openModal={this.props.openModal}/>
        {this.state.tasks.length > 0 ? this.state.tasks.map(item => <ItemTask
          key={item.id}
          task={item}
          updateCompletedStatus={this.updateCompletedStatus}
          updateImportantStatus={this.updateImportantStatus}/>) : <NoItems/>}
      </div>
    )
  }
}