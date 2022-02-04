import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import ModalWindow from "./Components/Modals/ModalWindow";
import './App.css';
import {useSelector} from "react-redux";
import Loader from "./Components/Modals/Loader";

interface rootState {
  isModalWindowShown: boolean;
  isLoaderShown: boolean;
}

export default function App() {
  const isModalWindowShown = useSelector((state: rootState) => state.isModalWindowShown);
  const isLoaderShown = useSelector((state: rootState) => state.isLoaderShown);

  return (
    <main className="application">
      <header className="header">
        <Header/>
      </header>
      <nav className="navbar">
        <Navbar/>
      </nav>
      <article className="main">
        <h2 className="visually-hidden">All tasks user created</h2>
        <Main/>
      </article>
      {isModalWindowShown && <ModalWindow/>}
      {isLoaderShown && <Loader />}
    </main>
  )
};
