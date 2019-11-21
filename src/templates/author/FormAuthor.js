import React, { Component } from "react";

import Input from "../../components/inputs/InputText";
import ButtonConfirm from "../../components/buttons/buttonConfirm";

export default class FormAuthor extends Component {
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
                msg={this.state.msg}
              />
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