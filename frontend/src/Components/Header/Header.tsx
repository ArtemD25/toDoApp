import React from 'react';
import './Header.css';

export default function Header() {
  function getCurrentDate(): string {
    const date = new Date();
    return `${date.toLocaleString('en-US', {weekday: 'long'})}, ${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <div className="header__wrapper">
      <h2 className="header__header">To Do List</h2>
      <p className="header__date">{getCurrentDate()}</p>
    </div>
  );
}

