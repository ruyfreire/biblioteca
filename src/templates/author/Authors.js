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
      edit: [false, {}]
    };
  }

  componentDidMount() {
    this.carregaLista();
  }

  carregaLista(url) {
    AuthorAPI.listar(url)
      .then(data => this.setState({ ...data, edit: [false, {}] }))
      .catch(error => this.setState(error));
  }

  formAuthor = (dados, callback) => {
    this.carregaLista();
    setTimeout(() => {
      console.log(this.state.edit);
    }, 500);
    // callback("success");
    // AuthorAPI.cadastrarAuthor(dados)
    //   .then(() => {
    //   })
    //   .catch(error => console.log(error));
  };

  deleteAuthor = (id, callback) => {
    AuthorAPI.deleteAuthor(id)
      .then(resp => {
        this.carregaLista();
        callback("success");
      })
      .catch(error => console.log(error));
  };

  editAuthor = (author, callback) => {
    this.setState({ edit: [true, author] });
    callback("success");

    // AuthorAPI.editAuthor(author).then(resp => {
    //   callback(resp);
    //   this.carregaLista();
    // });
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
            edit={this.editAuthor}
          />
        ) : null}

        {this.state.statusAPI !== "error" ? (
          <FormAuthor formAuthor={this.formAuthor} edit={this.state.edit} />
        ) : null}
      </div>
    );
  }
}

class ListaAuthor extends Component {
  constructor() {
    super();
    this.state = { optionsList: false, authorCheck: [] };
    this.authorCheck = React.createRef();
  }

  nextPage = () => this.props.pagination().next();
  prevPage = () => this.props.pagination().prev();

  showOptions = id => {
    this.setState({
      optionsList: true,
      authorCheck: this.props.lista.authors.filter(at => at.id === id)
    });
  };

  editarAuthor = () => {
    this.props.edit(this.state.authorCheck[0], resp => {
      if (resp === "success") {
        this.setState({ optionsList: false, authorCheck: [] });
      }
    });
  };

  deleteAuthor = () => {
    this.props.delete(this.state.authorCheck[0].id, resp => {
      if (resp === "success") {
        this.setState({ optionsList: false, authorCheck: [] });
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
          {this.state.optionsList ? (
            <p>{this.state.authorCheck[0].name}:</p>
          ) : null}
          <ButtonEditList
            class={
              this.state.optionsList ? "options-list show" : "options-list"
            }
            buttons={[
              { class: "edit", name: "Editar", click: this.editarAuthor },
              { class: "delete", name: "Deletar", click: this.deleteAuthor }
            ]}
          />

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
      edit: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const status = nextProps.edit[0];
    const author = nextProps.edit;
    if (status === true) {
      this.setState({
        name: author.name,
        edit: author,
        button: "Editar",
        titleOperation: "Editar Autor"
      });
      this.toggleForm();
    }
  }

  toggleForm = () => {
    if (this.state.window) {
      this.setState({
        window: !this.state.window,
        name: "",
        titleOperation: "Cadastro Autor",
        button: "Cadastrar",
        edit: []
      });
    } else {
      this.setState({ window: !this.state.window });
    }
  };

  formAuthor = event => {
    event.preventDefault();
    if (this.state.edit[0] === true) {
      console.log("editado!");
      this.toggleForm();
    } else {
      console.log("cadastro!");
      this.props.formAuthor({ name: this.state.name }, result => {
        // if (result === "success") {
        //   this.toggleForm();
        // } else {
        //   this.setState({ msg: "Erro ao cadastrar Autor" });
        // }
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
