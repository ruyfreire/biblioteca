import React, { Component } from "react";

export default class ButtonConfirm extends Component {
  render() {
    return (
      <button className="btn-confirm" {...this.props}>
        {this.props.value}
      </button>
    );
  }
}
