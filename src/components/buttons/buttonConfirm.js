import React, { Component } from "react";

export default class ButtonConfirm extends Component {
  render() {
    return (
      <button className="btn-open" {...this.props}>
        {this.props.value}
      </button>
    );
  }
}
