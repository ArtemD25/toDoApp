import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import AddTask from "./Components/AddTask/AddTask";
import './App.css';

interface Props {

}

interface State {
  showModal: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  openModal = (): void => {
    if (!this.state.showModal) {
      this.setState({showModal: true})
    }
  }

  closeModal = (): void => {
    if (this.state.showModal) {
      this.setState({showModal: false})
    }
  }

  render() {
    return (
      <div className="application">
        <header className="header">
          <Header/>
        </header>
        <nav className="navbar">
          <Navbar/>
        </nav>
        <main className="main">
          <Main openModal={this.openModal}/>
        </main>
        {this.state.showModal ?
          <section className="addTask">
            <AddTask closeModal={this.closeModal}/>
          </section> : null}
      </div>
    );
  }
}
