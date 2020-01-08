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

  carregaLista = url => {
    AuthorAPI.listar(url)
      .then(data =>
        this.setState({ ...data, edit: { status: false, author: {} } })
      )
      .catch(error => this.setState(error));
  };

  cadastraAuthor = dados => {
    const result = AuthorAPI.cadastrar(dados);
    result
      .then(() => {
        this.carregaLista();
      })
      .catch(error => console.log(error));
    return result;
  };

  deleteAuthor = id => {
    const resp = AuthorAPI.delete(id);
    resp
      .then(() => {
        this.carregaLista();
      })
      .catch(error => {
        console.log(error);
      });
    return resp;
  };

  openEditAuthor = edit => {
    this.setState({ edit: { status: edit.status, author: edit.author } });
  };

  removeStatusEdit = () => {
    this.setState({ edit: { status: false, author: {} } });
  }

  editAuthor = author => {
    const result = AuthorAPI.edit(author);
    result
      .then(() => {
        this.carregaLista();
      })
      .catch(error => {
        console.log(error);
      });
    return result;
  };

  listBooks = id => {
    return AuthorAPI.listarBooks(id);
  };

  pagination = () => {
    return {
      next: () =>
        this.state.next !== null ? this.carregaLista(this.state.next) : null,
      prev: () =>
        this.state.prev !== null ? this.carregaLista(this.state.prev) : null
    };
  };

  loading = status => {
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
  };

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
            books={this.listBooks}
          />
        ) : null}

        {this.state.statusAPI !== "error" ? (
          <FormAuthor
            cadastraAuthor={this.cadastraAuthor}
            editAuthor={this.editAuthor}
            edit={this.state.edit}
            removeStatusEdit={this.removeStatusEdit}
          />
        ) : null}
      </div>
    );
  }
}
