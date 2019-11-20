import React, { Component } from "react";

import TableList from "../../components/tables/tableList";
import AuthorAPI from "../../rules/AuthorsAPI";
import { Input } from "../../components/inputs/input";
import {
  ButtonOpen,
  ButtonPagination,
  ButtonEditList
} from "../../components/buttons/buttons";

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
          <ListaAuthor
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

class ListaAuthor extends Component {
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
    this.props.delete(this.state.edit.author.id, resp => {
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
                { class: "edit", name: "Editar", click: this.editarAuthor },
                { class: "delete", name: "Deletar", click: this.deleteAuthor }
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

class FormAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Cadastrar",
      titleOperation: "Cadastrar Autor",
      window: false,
      name: "",
      maxInput: 50,
      msg: "",
      edit: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.edit.status) {
      this.setState({ edit: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.edit && !prevState.edit)
      this.setState({
        window: !this.state.window,
        name: this.props.edit.author.name,
        button: "Editar",
        titleOperation: "Editar Autor"
      });
  }

  toggleForm = () => {
    this.setState({
      window: !this.state.window,
      name: "",
      titleOperation: "Cadastro Autor",
      button: "Cadastrar",
      edit: false,
      msg: ""
    });
  };

  formAuthor = event => {
    event.preventDefault();
    if (this.state.edit === true) {
      this.props.editAuthor(
        { id: this.props.edit.author.id, name: this.state.name },
        result => {
          switch (result) {
            case "success":
              this.toggleForm();
              break;

            case "none":
              this.setState({ msg: "Nada foi alterado!" });
              break;

            case "error":
              this.setState({ msg: "Erro ao editar Autor" });
              break;

            default:
              break;
          }
        }
      );
    } else {
      this.props.cadastraAuthor({ name: this.state.name }, result => {
        if (result === "success") {
          this.toggleForm();
        } else {
          this.setState({ msg: "Erro ao cadastrar Autor" });
        }
      });
    }
  };

  inputName = evento => {
    this.setState({ name: evento.target.value, msg: "" });
    if (evento.target.value.length === this.state.maxInput) {
      this.setState({ msg: `Máximo de ${this.state.maxInput} caractéres` });
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
            <form onSubmit={this.formAuthor} method="post">
              <Input
                id={"name"}
                label={"Nome:"}
                type={"text"}
                name={"name"}
                value={this.state.name}
                maxLength={this.state.maxInput}
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
