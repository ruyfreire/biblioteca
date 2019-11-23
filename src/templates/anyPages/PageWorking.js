import React, { Component } from "react";
import pageConstruction from "../../img/page-construction.png";

export default class anyPages extends Component {
  render() {
    return (
      <div className="box-listagem">
        <h1 className="title">Página em construção</h1>
        <div className="page-working">
          <img src={pageConstruction} alt="Página em construção" />
        </div>
      </div>
    );
  }
}
