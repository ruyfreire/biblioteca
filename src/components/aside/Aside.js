import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Aside extends Component {
  constructor() {
    super();
    this.state = { asideOpen: false };
  }
  open = () => this.setState({ asideOpen: !this.state.asideOpen });

  render() {
    return (
      <aside className={this.state.asideOpen ? "open" : ""}>
        <div className="aside-container">
          <ul>
            <li className="menu" onClick={this.open}>
              <a href=" #">
                <i className="fas fa-bars"></i>Menu
              </a>
            </li>
            <li className="home">
              <Link to={"/"}>
                <i className="fas fa-home"></i>Home
              </Link>
            </li>
            <li className="authors">
              <Link to={"/authors"}>
                <i className="fas fa-user"></i>Autores
              </Link>
            </li>
            <li className="books">
              <Link to={"/books"}>
                <i className="fas fa-book"></i>Livros
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}
