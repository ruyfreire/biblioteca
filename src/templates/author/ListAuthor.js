import React, { Component } from "react";

import TableList from "../../components/tables/TableList";
import ButtonPagination from "../../components/buttons/buttonPagination";
import ButtonEditList from "../../components/buttons/buttonEditList";

export default class ListAuthor extends Component {
  constructor() {
    super();
    this.state = { msg: "", edit: { status: false, author: {} } };
  }

  clear = () => {
    this.setState({ msg: "", edit: { status: false, author: {} } });
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
        author: this.props.lista.authors.filter(at => at.id === id)[0]
      },
      msg: ""
    });
  };

  editarAuthor = () => {
    this.props.edit(this.state.edit);
    this.clear();
  };

  deleteAuthor = () => {
    this.props
      .delete(this.state.edit.author.id)
      .then(() => this.clear())
      .catch(() => this.setState({ msg: "Erro ao deletar" }));
  };

  render() {
    return (
      <div className="box-list">
        <TableList
          cabecalho={Object.keys(this.props.lista.authors[0])}
          corpo={this.props.lista.authors}
          click={this.showOptions}
        />
        <div className="bottom-table">
          <div className="bottom-edit">
            {this.state.edit.status ? (
              <p>{this.state.edit.author.name}:</p>
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
                  click: this.editarAuthor
                },
                {
                  class: "delete",
                  icon: "fas fa-trash-alt",
                  name: "Deletar",
                  click: this.deleteAuthor
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
