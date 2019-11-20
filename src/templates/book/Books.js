import React, { Component } from "react";

import TableList from "../../components/tables/tableList";
import BookAPI from "../../rules/BookAPI";
import { Input } from "../../components/inputs/input";
import {
  ButtonOpen,
  ButtonPagination,
  ButtonEditList
} from "../../components/buttons/buttons";

export default class BookBox extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      next: null,
      prev: null,
      books: [{}],
      statusAPI: null,
      edit: { status: false, book: {} }
    };
  }

  componentDidMount() {
    this.carregaLista();
  }

  carregaLista(url) {
    BookAPI.listar(url)
      .then(data =>
        this.setState({ ...data, edit: { status: false, book: {} } })
      )
      .catch(error => this.setState(error));
  }

  cadastra = (dados, callback) => {
    BookAPI.cadastrar(dados)
      .then(() => {
        this.carregaLista();
        callback("success");
      })
      .catch(error => console.log(error));
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

  openEdit = (edit, callback) => {
    this.setState({ edit: { status: edit.status, book: edit.book } });
  };

  edit = (book, callback) => {
    if (book.name !== this.state.edit.book.name) {
      BookAPI.edit(book)
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
          <ListaBook
            lista={this.state}
            pagination={this.pagination}
            delete={this.delete}
            openEdit={this.openEdit}
          />
        ) : null}

        {this.state.statusAPI !== "error" ? (
          <FormBook
            cadastra={this.cadastra}
            edit={this.edit}
            edited={this.state.edit}
          />
        ) : null}
      </div>
    );
  }
}

class ListaBook extends Component {
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

class FormBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Cadastrar",
      titleOperation: "Cadastrar Livro",
      window: false,
      name: "",
      summary: "",
      maxName: 30,
      maxSummary: 300,
      msg: "",
      edited: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.edited.status) {
      this.setState({ edited: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.edited && !prevState.edited)
      this.setState({
        window: !this.state.window,
        name: this.props.edited.book.name,
        button: "Editar",
        titleOperation: "Editar Livro"
      });
  }

  toggleForm = () => {
    this.setState({
      window: !this.state.window,
      name: "",
      titleOperation: "Cadastro Livro",
      button: "Cadastrar",
      edited: false,
      msg: ""
    });
  };

  form = event => {
    event.preventDefault();
    if (this.state.edited === true) {
      this.props.edit(
        { id: this.props.edited.book.id, name: this.state.name },
        result => {
          switch (result) {
            case "success":
              this.toggleForm();
              break;

            case "none":
              this.setState({ msg: "Nada foi alterado!" });
              break;

            case "error":
              this.setState({ msg: "Erro ao editar Livro" });
              break;

            default:
              break;
          }
        }
      );
    } else {
      this.props.cadastra({ name: this.state.name }, result => {
        if (result === "success") {
          this.toggleForm();
        } else {
          this.setState({ msg: "Erro ao cadastrar Livro" });
        }
      });
    }
  };

  inputName = evento => {
    this.setState({ name: evento.target.value, msg: "" });
    if (evento.target.value.length === this.state.maxName) {
      this.setState({ msg: `Máximo de ${this.state.maxName} caractéres` });
    }
  };

  render() {
    return (
      <div className="box-cadastro">
        <div
          className={
            this.state.window
              ? "box-cadastro-container open"
              : "box-cadastro-container"
          }
        >
          <div className="btn-cadastro" onClick={this.toggleForm}>
            <span>Abrir</span>
          </div>
          <h3 className="box-title">{this.state.titleOperation}</h3>
          <div className="box-form">
            <form onSubmit={this.form} method="post">
              <Input
                id={"name"}
                label={"Título"}
                type={"text"}
                name={"name"}
                value={this.state.name}
                maxLength={this.state.maxName}
                onChange={this.inputName}
              />
              <span className="msg">{this.state.msg}</span>
              <ButtonOpen
                type={"submit"}
                value={this.state.button}
                disabled={this.state.name.trim().length === 0 ? "disabled" : ""}
              />
            </form>
          </div>
        </div>
        <div className={this.state.window ? "mask show" : "mask"}></div>
      </div>
    );
  }
}
