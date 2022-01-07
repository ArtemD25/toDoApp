import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import './App.css';

export default function App() {
  return (
    <div className="application">
      <header className="header">
        <Header />
      </header>
      <nav className="navbar">
        <Navbar />
      </nav>
      <main className="main">
        <Main />
      </main>
    </div>
  );
}
