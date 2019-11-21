import React, { Component } from "react";

export default class ButtonEditList extends Component {
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
