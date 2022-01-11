import React from "react";
import ItemTask from '../ItemTask/ItemTask';

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

  render() {
    return (
      <div>{this.state.tasks.map(item => <ItemTask key={item.id} task={item}/>)}</div>
    )
  }
}