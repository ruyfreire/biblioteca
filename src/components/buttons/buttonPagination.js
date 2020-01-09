import React, { Component } from "react";

export default class ButtonPagination extends Component {
  constructor() {
    super();
    this.state = { pageTotal: 1, pageCurrent: 1 }
  }

  componentDidMount() {
    this.setNumberPages();
  }
  
  componentDidUpdate(prevProps) {
    if(Math.ceil(this.props.numberPage / 5) !== this.state.pageTotal )
      this.setNumberPages();
  }
  
  setNumberPages() {
    this.setState({pageCurrent: 1, pageTotal: Math.ceil(this.props.numberPage / 5) });
  }

  render() {
    return (
      <div className="pagination">

        <div className="numbers">
          <span>{this.state.pageCurrent}</span>
          <span className="bar">/</span>
          <span>{this.state.pageTotal}</span>
        </div>

        <div
          className={this.props.prev === null ? "prev no-click" : "prev"}
          onClick={() => {this.props.prev(); this.setState({pageCurrent: this.state.pageCurrent - 1 })}}
        >
          <i className="fas fa-caret-left"></i>
          prev
        </div>

        <div
          className={this.props.next === null ? "next no-click" : "next"}
          onClick={() => { this.props.next(); this.setState({pageCurrent: this.state.pageCurrent + 1 })}}
        >
          <i className="fas fa-caret-right"></i>
          next
        </div>
      </div>
    );
  }
}
