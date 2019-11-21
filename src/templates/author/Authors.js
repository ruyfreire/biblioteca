import React, { Component } from "react";

import AuthorAPI from "../../rules/AuthorsAPI";
import ListAuthor from "./ListAuthor";
import FormAuthor from "./FormAuthor";

export default class AuthorBox extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      next: null,
      prev: null,
      authors: [{}],
      statusAPI: null,
      edit: { status: false, author: {} }
    };
  }

  componentDidMount() {
    this.carregaLista();
  }

  carregaLista(url) {
    AuthorAPI.listar(url)
      .then(data =>
        this.setState({ ...data, edit: { status: false, author: {} } })
      )
      .catch(error => this.setState(error));
  }

  cadastraAuthor = (dados, callback) => {
    AuthorAPI.cadastrarAuthor(dados)
      .then(() => {
        this.carregaLista();
        callback("success");
      })
      .catch(error => console.log(error));
  };

  deleteAuthor = (id, callback) => {
    AuthorAPI.deleteAuthor(id)
      .then(() => {
        this.carregaLista();
        callback("success");
      })
      .catch(error => {
        console.log(error);
        callback("error");
      });
  };

  openEditAuthor = (edit, callback) => {
    this.setState({ edit: { status: edit.status, author: edit.author } });
  };

  editAuthor = (author, callback) => {
    if (author.name !== this.state.edit.author.name) {
      AuthorAPI.editAuthor(author)
        .then(() => {
          this.carregaLista();
          callback("success");
        })
        .catch(error => {
          console.log(error);
          callback("error");
        });
    } else {
      callback("none");
    }
  };

  pagination = () => {
    return {
      next: () =>
        this.state.next !== null ? this.carregaLista(this.state.next) : null,
      prev: () =>
        this.state.prev !== null ? this.carregaLista(this.state.prev) : null
    };
  };

  loading(status) {
    switch (this.state.statusAPI) {
      case "empty":
        return status.load;
      case "error":
        return status.error;
      case "success":
        return status.success;
      default:
        return status.load;
    }
  }

  render() {
    return (
      <div className="box-listagem">
        <h1 className="title">Listagem de autores</h1>

        {this.state.statusAPI === null ? (
          <p className="msg-status">Carregando lista...</p>
        ) : null}

        {this.state.statusAPI === "empty" ? (
          <p className="msg-status">Lista Vazia</p>
        ) : null}

        {this.state.statusAPI === "error" ? (
          <p className="msg-status">Erro ao buscar autores</p>
        ) : null}

        {this.state.statusAPI === "success" ? (
          <ListAuthor
            lista={this.state}
            pagination={this.pagination}
            delete={this.deleteAuthor}
            edit={this.openEditAuthor}
          />
        ) : null}

        {this.state.statusAPI !== "error" ? (
          <FormAuthor
            cadastraAuthor={this.cadastraAuthor}
            editAuthor={this.editAuthor}
            edit={this.state.edit}
          />
        ) : null}
      </div>
    );
  }
}
