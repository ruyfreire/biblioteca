import React, { Component } from "react";
import Aside from "./components/aside/Aside";

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Aside />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
