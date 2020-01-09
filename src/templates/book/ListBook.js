import React, { Component } from "react";

import DetailsList from "../../components/tables/DetailsList";
import ButtonPagination from "../../components/buttons/buttonPagination";
import ButtonEditList from "../../components/buttons/buttonEditList";

export default class ListaBook extends Component {
  constructor() {
    super();
    this.state = {
      filter: "",
      msg: "",
      edit: { status: false, book: {} },
      listAuthors: []
    };
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
    let att = {
      edit: {
        status: true,
        book: this.props.lista.books.filter(at => at.id === id)[0]
      },
      msg: ""
    };
    this.props
      .authors(id)
      .then(data => {
        att.listAuthors = data;
        this.setState(att);
      })
      .catch(() => {
        this.setState(att);
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

  itensTable = linha => {
    let itens = [];
    for (let item in linha) {
      if (item !== "id" && item !== "author") {
        itens.push(<td key={item + linha[item]}>{linha[item]}</td>);
      }
    }

    return itens;
  };

  search = e => {
    e.preventDefault();
    this.props.search(this.state.filter);
  }

  render() {
    return (
      <div className="box-list">

        <form className="search-filter" onSubmit={this.search} onKeyUp={this.search}>
          <input
            value={this.state.filter}
            onChange={e => this.setState({ filter: e.target.value })}
            type="text"
            name="filter"
            placeholder="Pesquisar nome..." />
        </form>

        <div className="list-table">
          <table>
            <thead>
              <tr>
                {Object.keys(this.props.lista.books[0]).map(title => {
                  if (title !== "id" && title !== "author")
                    return <th key={title}>{title}</th>;
                  else return null;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.lista.books.map((linha, index) => {
                return (
                  <tr
                    key={index}
                    id={`id-${linha.id}`}
                    onClick={() => this.showOptions(linha.id)}
                  >
                    {this.itensTable(linha).map(td => td)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
                {
                  class: "edit",
                  icon: "fas fa-edit",
                  name: "Editar",
                  click: this.editar
                },
                {
                  class: "delete",
                  icon: "fas fa-trash-alt",
                  name: "Deletar",
                  click: this.delete
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
            title={"Autores deste livro"}
            list={this.state.listAuthors}
          />
        )}
      </div>
    );
  }
}
