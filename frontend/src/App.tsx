import React, {useState} from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import ModalWindow from "./Components/ModalWindow/ModalWindow";
import './App.css';
import {useDispatch, useSelector} from "react-redux";

interface Props {

}

interface rootState {
  isModalWindowShown: boolean;
}

export default function App(props: Props) {
  const isModalWindowShown = useSelector((state: rootState) => state.isModalWindowShown);

  // const [isModalShown, toggleModal] = useState(false);
  // const [modalText, setModalText] = useState('');
  // const [modalTextId, setModalTextId] = useState(null);

  // const saveNewTaskText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   console.log('saveNewTaskText')
  //   this.setState({modalText: evt.currentTarget.value})
  // }

  // const openModal = (textToRenderInModal: string, modalTextId: number): void => {
  //   console.log('openModal')
  //   if (!this.state.showModal) {
  //     this.setState({showModal: true})
  //     this.setState({modalText: textToRenderInModal});
  //     this.setState({modalTextId: modalTextId});
  //   }
  // }
  //
  // const provideUpdatedTaskTextAndID = (): string[] => {
  //   console.log('provideUpdatedTaskTextAndID')
  //   return [this.state.modalText, String(this.state.modalTextId)];
  // }

  return (
    <div className="application">
      <header className="header">
        <Header/>
      </header>
      <nav className="navbar">
        <Navbar/>
      </nav>
      <main className="main">
        <Main/>
      </main>
      {isModalWindowShown && <ModalWindow/>}
      </div>
  )
}
