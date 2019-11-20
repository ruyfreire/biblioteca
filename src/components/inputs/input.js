import React, { Component } from "react";

export class Input extends Component {
  render() {
    return (
      <label htmlFor={this.props.id}>
        <span className="input-title">{this.props.label}</span>
        <input {...this.props} />
      </label>
    );
  }
}

export class Select extends Component {
  render() {
    return (
      <label htmlFor={this.props.id}>
        <span>{this.props.label}</span>
        <select
          id={this.props.id}
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
        >
          <option value="0">{this.props.label}</option>
          {/* {this.props.autores.map(function(autor) {
            return (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            );
          })} */}
        </select>
      </label>
    );
  }
}

export default null;
