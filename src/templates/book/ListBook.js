import React, { Component } from "react";

import ButtonPagination from "../../components/buttons/buttonPagination";
import ButtonEditList from "../../components/buttons/buttonEditList";

export default class ListaBook extends Component {
  constructor() {
    super();
    this.state = { msg: "", edit: { status: false, book: {} } };
  }

  clear = () => {
    this.setState({ msg: "", edit: { status: false, book: {} } });
  };

  nextPage = () => {
    this.props.pagination().next();
    this.clear();
  };

  prevPage = () => {
    this.props.pagination().prev();
    this.clear();
  };

  showOptions = id => {
    this.setState({
      edit: {
        status: true,
        book: this.props.lista.books.filter(at => at.id === id)[0]
      },
      msg: ""
    });
  };

  editar = () => {
    this.props.openEdit(this.state.edit);
    this.clear();
  };

  delete = () => {
    this.props.delete(this.state.edit.book.id, resp => {
      if (resp === "success") {
        this.clear();
      } else {
        this.setState({ msg: "Erro ao deletar" });
      }
    });
  };

  itensTable = linha => {
    let itens = [];
    for (let item in linha) {
      if (item !== "id" && item !== "author") {
        itens.push(<td key={linha[item]}>{linha[item]}</td>);
      }
    }

    return itens;
  };

  render() {
    return (
      <div className="box-list">
        <div className="list-table">
          <table>
            <thead>
              <tr>
                {Object.keys(this.props.lista.books[0]).map(title => {
                  if (title !== "id" && title !== "author")
                    return <th key={title}>{title}</th>;
                  else return null;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.lista.books.map((linha, index) => {
                return (
                  <tr
                    key={index}
                    id={`id-${linha.id}`}
                    onClick={() => this.showOptions(linha.id)}
                  >
                    {this.itensTable(linha).map(td => td)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bottom-table">
          <div className="bottom-edit">
            {this.state.edit.status ? (
              <p>{this.state.edit.book.name}:</p>
            ) : null}
            <ButtonEditList
              class={
                this.state.edit.status ? "options-list show" : "options-list"
              }
              buttons={[
                {
                  class: "edit",
                  icon: "fas fa-edit",
                  name: "Editar",
                  click: this.editar
                },
                {
                  class: "delete",
                  icon: "fas fa-trash-alt",
                  name: "Deletar",
                  click: this.delete
                }
              ]}
            />
            <span className="msg">{this.state.msg}</span>
          </div>

          <ButtonPagination
            prev={this.props.lista.prev !== null ? this.prevPage : null}
            next={this.props.lista.next !== null ? this.nextPage : null}
          />
        </div>
      </div>
    );
  }
}
