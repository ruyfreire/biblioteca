import React, { Component } from "react";

export class ButtonOpen extends Component {
  render() {
    return (
      <button className="btn-open" {...this.props}>
        {this.props.value}
      </button>
    );
  }
}

export class ButtonPagination extends Component {
  render() {
    return (
      <div className="pagination">
        <div
          className={this.props.prev === null ? "prev no-click" : "prev"}
          onClick={this.props.prev}
        >
          prev
        </div>

        <div
          className={this.props.next === null ? "next no-click" : "next"}
          onClick={this.props.next}
        >
          next
        </div>
      </div>
    );
  }
}

export class ButtonEditList extends Component {
  render() {
    return (
      <div className={this.props.class}>
        {this.props.buttons.map(btn => {
          return (
            <div
              key={btn.name}
              className={btn.class}
              title={btn.name}
              onClick={btn.click}
            >
              {btn.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default null;
