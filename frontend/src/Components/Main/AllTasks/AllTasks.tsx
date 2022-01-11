import React, {MouseEventHandler} from "react";
import ItemNew from "../ItemNew/ItemNew";
import ItemTask from '../ItemTask/ItemTask';

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

  render() {
    return (
      <div>
        <ItemNew openModal={this.props.openModal}/>
        {this.state.tasks.map(item => <ItemTask key={item.id} task={item}/>)}
      </div>
    )
  }
}