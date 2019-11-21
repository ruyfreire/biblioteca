import React, { Component } from "react";

import TableList from "../../components/tables/tableList";
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

  render() {
    return (
      <div className="box-list">
        <TableList
          cabecalho={Object.keys(this.props.lista.books[0])}
          corpo={this.props.lista.books}
          click={this.showOptions}
        />
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
                { class: "edit", name: "Editar", click: this.editar },
                { class: "delete", name: "Deletar", click: this.delete }
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
