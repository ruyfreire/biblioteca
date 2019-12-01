import React, { Component } from "react";

import Input from "../../components/inputs/InputText";
import ButtonConfirm from "../../components/buttons/buttonConfirm";

export default class FormBook extends Component {
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
      selectAuthor: 0,
      msgInput: "",
      msgTextArea: "",
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
        summary: this.props.edited.book.summary,
        selectAuthor: this.props.edited.book.author[0],
        button: "Editar",
        titleOperation: "Editar Livro"
      });
  }

  toggleForm = () => {
    this.setState({
      window: !this.state.window,
      name: "",
      summary: "",
      selectAuthor: 0,
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

  inputName = e => {
    this.setState({ name: e.target.value, msgInput: "" });
    if (e.target.value.length === this.state.maxName) {
      this.setState({ msgInput: `Máximo de ${this.state.maxName} caractéres` });
    }
  };

  inputSummary = e => {
    this.setState({ summary: e.target.value, msgTextArea: "" });
    if (e.target.value.length === this.state.maxSummary) {
      this.setState({
        msgTextArea: `Máximo de ${this.state.maxSummary} caractéres`
      });
    }
  };

  changeAuthor = e => {
    this.setState({ selectAuthor: e.target.value });
  };

  render() {
    return (
      <div className="box-cadastro">
        <div
          className={
            this.state.window
              ? "box-cadastro-container book open"
              : "box-cadastro-container book"
          }
        >
          <div
            className={this.state.window ? "btn-open open" : "btn-open"}
            onClick={this.toggleForm}
          >
            <i className="fas fa-plus"></i>
            Abrir
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
              <span className="msg">{this.state.msgInput}</span>
              <label htmlFor="summary">
                <span className="textarea-title">Sinópse</span>
                <textarea
                  id="summary"
                  name="summary"
                  rows="3"
                  value={this.state.summary}
                  maxLength={this.state.maxSummary}
                  onChange={this.inputSummary}
                />
              </label>
              <span className="msg">{this.state.msgTextArea}</span>
              <label htmlFor="book-authors">
                <span className="select-title">Selecione o author</span>
                <select
                  name="authors"
                  id="book-authors"
                  value={this.state.selectAuthor}
                  onChange={this.changeAuthor}
                >
                  <option value="0">Selecione o autor</option>
                  {this.props.authors.map(author => {
                    return (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <ButtonConfirm
                type={"submit"}
                value={this.state.button}
                disabled={
                  this.state.name.trim().length !== 0 &&
                  this.state.name.trim().length !== this.state.maxName &&
                  this.state.summary.trim().length !== 0 &&
                  this.state.summary.trim().length !== this.state.maxSummary &&
                  this.state.selectAuthor.toString() !== "0"
                    ? ""
                    : "disabled"
                }
              />
            </form>
          </div>
        </div>
        <div
          className={this.state.window ? "mask show" : "mask"}
          onClick={this.toggleForm}
        ></div>
      </div>
    );
  }
}
