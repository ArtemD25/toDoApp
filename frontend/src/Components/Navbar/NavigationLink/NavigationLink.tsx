import React from 'react';
import './NavigationLink.css';

interface Props {
  linkData: {
    text: string;
    to: string;
    svg: JSX.Element;
  }
}

export default class NavigationLink extends React.Component<Props> {
  render() {
    return (
      <li>
        <a className="NavLink__container" href={this.props.linkData.to}>
          <span className="NavLink__icon">{this.props.linkData.svg}</span>
          <span className="NavLink__text">{this.props.linkData.text}</span>
        </a>
      </li>
    );
  }
}

