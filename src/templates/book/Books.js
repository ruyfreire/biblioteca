import React, { Component } from "react";

import BookAPI from "../../rules/BookAPI";
import FormBook from "./FormBook";
import ListBook from "./ListBook";

export default class BookBox extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      next: null,
      prev: null,
      books: [{}],
      statusAPI: null,
      edit: { status: false, book: {} },
      authors: []
    };
  }

  componentDidMount() {
    this.carregaLista();
    this.carregaAuthor();
  }

  carregaLista(url) {
    BookAPI.listar(url)
      .then(data =>
        this.setState({ ...data, edit: { status: false, book: {} } })
      )
      .catch(error => console.log(error));
  }

  carregaAuthor = () => {
    BookAPI.listarAuthors()
      .then(data => this.setState({ authors: data }))
      .catch(error => console.log(error));
  };

  buscaAuthor = id => {
    return BookAPI.buscaAuthor(id);
  };

  cadastra = dados => {
    const result = BookAPI.cadastrar(dados);
    result.then(() => this.carregaLista()).catch(error => console.log(error));
    return result;
  };

  delete = (id, callback) => {
    BookAPI.delete(id)
      .then(() => {
        this.carregaLista();
        callback("success");
      })
      .catch(error => {
        console.log(error);
        callback("error");
      });
  };

  openEdit = edit => {
    this.setState({ edit: { status: edit.status, book: edit.book } });
  };

  removeStatusEdit = () => {
    this.setState({ edit: { status: false, book: this.state.edit.book } });
  }

  edit = book => {
    const result = BookAPI.edit(book);
    result
      .then(() => {
        this.carregaLista();
      })
      .catch(error => {
        console.log(error);
      });

      return result;
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
        <h1 className="title">Listagem de livros</h1>

        {this.state.statusAPI === null ? (
          <p className="msg-status">Carregando lista...</p>
        ) : null}

        {this.state.statusAPI === "empty" ? (
          <p className="msg-status">Lista Vazia</p>
        ) : null}

        {this.state.statusAPI === "error" ? (
          <p className="msg-status">Erro ao buscar livros</p>
        ) : null}

        {this.state.statusAPI === "success" ? (
          <ListBook
            lista={this.state}
            pagination={this.pagination}
            delete={this.delete}
            openEdit={this.openEdit}
            authors={this.buscaAuthor}
          />
        ) : null}

        {this.state.statusAPI !== "error" ? (
          <FormBook
            cadastra={this.cadastra}
            edit={this.edit}
            edited={this.state.edit}
            authors={this.state.authors}
            removeStatusEdit={this.removeStatusEdit}
          />
        ) : null}
      </div>
    );
  }
}
