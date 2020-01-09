import React, { Component } from "react";

export default class TableList extends Component {
  itensTable = linha => {
    let itens = [];
    for (let item in linha) {
      if (item !== "id") {
        itens.push(<td key={linha[item]}>{linha[item]}</td>);
      }
    }

    return itens;
  };

  render() {
    return (
      <div className="list-table">
        <table>
          <thead>
            <tr>
              {this.props.cabecalho.map(title => {
                if (title !== "id") return <th key={title}>{title}</th>;
                else return null;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.corpo.map((linha, index) => {
              return (
                <tr
                  key={index}
                  id={`id-${linha.id}`}
                  onClick={() => {
                    linha.id && this.props.click(linha.id);
                  }}
                >
                  {this.itensTable(linha).map(td => td)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
