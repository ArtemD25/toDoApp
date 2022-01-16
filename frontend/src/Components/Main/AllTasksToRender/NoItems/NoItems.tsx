import React from "react";
import './NoItems.css';

export default class NoItems extends React.Component {

  render() {
    return (
      <p className="NoItems__container">
        No tasks here
      </p>
    );
  }
}

