import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = { asideOpen: false };
  }
  open = () => this.setState({ asideOpen: !this.state.asideOpen });

  render() {
    return (
      <div className="app-container">
        <aside className={this.state.asideOpen ? "open" : ""}>
          <div className="aside-container">
            <ul>
              <li className="menu" onClick={this.open}>
                <a href=" #">Menu</a>
              </li>
              <li className="home">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="authors">
                <Link to={"/authors"}>Autores</Link>
              </li>
              <li className="books">
                <Link to={"/books"}>Livros</Link>
              </li>
              <li className="search">
                <Link to={"/"}>Busca detalhada</Link>
              </li>
            </ul>
          </div>
        </aside>

        <main>{this.props.children}</main>
      </div>
    );
  }
}
