import React, { Component } from "react";
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

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
      selectAuthor: [],
      msgInput: "",
      msgTextArea: "",
      edited: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.edited.status) {
      this.setState({ edited: true });
      this.props.removeStatusEdit();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.edited && !prevState.edited) {
        this.setState({
          window: !this.state.window,
          name: this.props.edited.book.name,
          summary: this.props.edited.book.summary,
          selectAuthor: this.setDefaultAuthors(this.props.edited.book.author),
          button: "Editar",
          titleOperation: "Editar Livro"
        });
    }
  }

  toggleForm = () => {
    this.setState({
      window: !this.state.window,
      name: "",
      summary: "",
      selectAuthor: [],
      titleOperation: "Cadastro Livro",
      button: "Cadastrar",
      edited: false,
      msg: ""
    });
  };

  form = event => {
    event.preventDefault();
    if (this.state.edited === true) {
      let newAuthors = this.state.selectAuthor.map(author => author.id);
      let listAuthors = this.props.edited.book.author;
      newAuthors = JSON.stringify(newAuthors.sort((a, b) => a - b));
      listAuthors = JSON.stringify(listAuthors.sort((a, b) => a - b));

      if (this.state.name === this.props.edited.book.name &&
        this.state.summary === this.props.edited.book.summary &&
        newAuthors === listAuthors) {
        this.setState({ msg: "Nada foi alterado!" });
      } else {
        this.props
          .edit({
            id: this.props.edited.book.id,
            name: this.state.name,
            summary: this.state.summary,
            author: this.state.selectAuthor.map(author => author.id)
          })
          .then(() => this.toggleForm())
          .catch(() => this.setState({ msg: "Erro ao editar Livro" }));
      }
    } else {
      this.props
        .cadastra({
          name: this.state.name,
          summary: this.state.summary,
          author: this.state.selectAuthor.map(author => author.id)
        })
        .then(() => this.toggleForm())
        .catch(() => this.setState({ msg: "Erro ao cadastrar Livro" }));
    }
  };

  inputName = e => this.setState({ name: e.target.value });

  inputSummary = e => this.setState({ summary: e.target.value });

  changeAuthor = e => {
    this.setState({ selectAuthor: e.target.value });
  };

  setDefaultAuthors = list => {
    let newList = [];
    this.props.authors.map(author => list.map(id => id === author.id && newList.push(author)));
    return newList;
  }

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
              
              <label htmlFor="book-authors">
                <span className="select-title">Selecione o author</span>
                <Multiselect
                  dropUp
                  data={this.props.authors}
                  textField='name'
                  value={this.state.selectAuthor}
                  onChange={author => {
                      // const names = list.map(author => author.id);
                      this.setState({selectAuthor: author})
                    }
                  }
                />
              </label>

              <ButtonConfirm
                type={"submit"}
                value={this.state.button}
                disabled={
                  this.state.name.trim().length !== 0 &&
                    this.state.name.trim().length !== this.state.maxName &&
                    this.state.summary.trim().length !== 0 &&
                    this.state.summary.trim().length !== this.state.maxSummary &&
                    this.state.selectAuthor.length !== 0
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
