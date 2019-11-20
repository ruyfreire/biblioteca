import React, { Component } from "react";

import { Input, Select } from "../../components/inputs/input";

export default class Books extends Component {
  render() {
    return (
      <div className="main-container">
        <h1 className="title">Listagem de livros</h1>
        <div className="box-form">
          <form action=" #" method="post">
            <Input
              id={"title-book"}
              label={"Título"}
              type={"text"}
              name={"title"}
            />
            <Input
              id={"summary-book"}
              label={"Síntese"}
              type={"text"}
              name={"summary"}
            />

            <Select
              id={"author-book"}
              label={"Selecione o autor"}
              name={"author"}
              // onChange={}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}
