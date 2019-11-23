import React, { Component } from "react";
import pageNotFound from "../../img/page-notfound.png";

export default class anyPages extends Component {
  render() {
    return (
      <div className="box-listagem">
        <h1 className="title">Página não encontrada</h1>
        <div className="page-notfound">
          <img src={pageNotFound} alt="Página em construção" />
        </div>
      </div>
    );
  }
}
