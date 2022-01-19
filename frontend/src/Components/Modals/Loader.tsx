import React from 'react';
import './Loader.css';

export default function Loader() {

  return (
    <section className="Loader__container">
      <ul className="Loader__wrapper">
        <li className="Loader__ball Loader__ball--blue"/>
        <li className="Loader__ball Loader__ball--red"/>
        <li className="Loader__ball Loader__ball--yellow"/>
        <li className="Loader__ball Loader__ball--green"/>
      </ul>
    </section>
  )
}

