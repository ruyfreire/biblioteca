import React, { Component } from "react";

export default class ButtonPagination extends Component {
  render() {
    return (
      <div className="pagination">
        <div
          className={this.props.prev === null ? "prev no-click" : "prev"}
          onClick={this.props.prev}
        >
          <i className="fas fa-caret-left"></i>
          prev
        </div>

        <div
          className={this.props.next === null ? "next no-click" : "next"}
          onClick={this.props.next}
        >
          <i className="fas fa-caret-right"></i>
          next
        </div>
      </div>
    );
  }
}
