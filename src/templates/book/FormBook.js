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
              <ButtonConfirm
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
