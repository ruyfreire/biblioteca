import React, { Component } from "react";

export default class DetailsList extends Component {
  render() {
    return (
      <div className="details-list">
        <h4 className="list-title">{this.props.title}</h4>
        <ul>
          {this.props.list.length > 0 ? (
            this.props.list.map((book, index) => {
              return (
                <li key={index}>
                  <p className="title-book">{book.name}</p>
                  <p className="summary-book">{book.summary}</p>
                </li>
              );
            })
          ) : (
            <li className="empty">Nenhum livro para este autor!</li>
          )}
        </ul>
      </div>
    );
  }
}
