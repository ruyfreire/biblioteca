import React, { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <label htmlFor={this.props.id}>
        <span className="input-title">{this.props.label}</span>
        <input {...this.props} />
      </label>
    );
  }
}
