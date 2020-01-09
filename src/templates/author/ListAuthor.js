import React, { Component } from "react";

import TableList from "../../components/tables/tableList";
import DetailsList from "../../components/tables/DetailsList";
import ButtonPagination from "../../components/buttons/buttonPagination";
import ButtonEditList from "../../components/buttons/buttonEditList";

export default class ListAuthor extends Component {
  constructor() {
    super();
    this.state = {
      boxSearch: false,
      filter: "",
      msg: "",
      edit: { status: false, author: {} },
      listBooks: []
    };
  }

  clear = () => {
    this.setState({
      msg: "",
      edit: { status: false, author: {} },
      listBooks: []
    });
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
    let att = {
      edit: {
        status: true,
        author: this.props.lista.authors.filter(at => at.id === id)[0]
      },
      msg: ""
    };
    this.props
      .books(id)
      .then(data => {
        att.listBooks = data;
        this.setState(att);
      })
      .catch(() => {
        this.setState(att);
      });
  };

  editarAuthor = () => {
    this.props.edit(this.state.edit);
    this.clear();
  };

  deleteAuthor = () => {
    this.props
      .delete(this.state.edit.author.id)
      .then(() => this.clear())
      .catch(() => this.setState({ msg: "Erro ao deletar" }));
  };

  search = () => {
    this.clear();
    this.props.search(this.state.filter);
  }

  toggleSearch = () => {
    if (this.state.boxSearch && this.state.filter.trim().length > 0) {
      this.search();
      this.setState({ filter: "", boxSearch: !this.state.boxSearch })
    }
    else {
      this.setState({ filter: "", boxSearch: !this.state.boxSearch })
      this.search();
    }
  }

  render() {
    return (
      <div className="box-list">

        <form
          className={this.state.boxSearch ? "search-filter open" : "search-filter"}
          onSubmit={this.search} onKeyUp={this.search}>

          <input
            value={this.state.filter}
            onChange={e => this.setState({ filter: e.target.value })}
            type="text"
            name="filter"
            placeholder="Pesquisar nome..."
            autoComplete="off" />

          <i className="fas fa-search" onClick={this.toggleSearch}></i>
        </form>

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
                {
                  class: "edit",
                  icon: "fas fa-edit",
                  name: "Editar",
                  click: this.editarAuthor
                },
                {
                  class: "delete",
                  icon: "fas fa-trash-alt",
                  name: "Deletar",
                  click: this.deleteAuthor
                }
              ]}
            />
            <span className="msg">{this.state.msg}</span>
          </div>

          <ButtonPagination
            numberPage={this.props.numberPage}
            prev={this.props.lista.prev !== null ? this.prevPage : null}
            next={this.props.lista.next !== null ? this.nextPage : null}
          />
        </div>

        {this.state.edit.status && (
          <DetailsList
            title={"Livros deste autor"}
            list={this.state.listBooks}
          />
        )}
      </div>
    );
  }
}
