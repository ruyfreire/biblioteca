import React, { Component } from "react";

import home from "../../img/home.png";

export default class Books extends Component {
  render() {
    return (
      <div className="box-listagem">
        <h1 className="title">Biblioteca</h1>
        <div className="home-library">
          <img src={home} alt="Logo da Biblioteca" />
        </div>
      </div>
    );
  }
}
