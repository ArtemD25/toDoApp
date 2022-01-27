import React from 'react';
import './Navbar.css';
import {NavLink} from "react-router-dom";

export default function Navbar() {

  return (
    <ul className="Navbar__list">
      <li>
        <NavLink
          className={({isActive}) => isActive ? 'NavLink__container NavLink__container--active' : 'NavLink__container'}
          to="/tasks/all">
          <span className="NavLink__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#7c7c7c" d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
            </svg>
          </span>
          <span className="NavLink__text">All tasks</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) => isActive ? 'NavLink__container NavLink__container--active' : 'NavLink__container'}
          to="/tasks/important">
          <span className="NavLink__icon">
            <svg viewBox="0 0 576 512">
              <path fill="#7c7c7c" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </span>
          <span className="NavLink__text">Important tasks</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) => isActive ? 'NavLink__container NavLink__container--active' : 'NavLink__container'}
          to="/tasks/completed">
          <span className="NavLink__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#7c7c7c" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </span>
          <span className="NavLink__text">Completed tasks</span>
        </NavLink>
      </li>
    </ul>
  );
}

