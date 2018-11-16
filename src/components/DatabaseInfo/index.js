import React, { Component } from "react"

class DatabaseInfo extends Component {
  render() {
    return (
      <div className="row">
        <h3 className="mx-3">{this.props.info.name}</h3>
        <small>A{this.props.info.type === "sqlite" && "n"} {this.props.info.type} database</small>
      </div>
    )
  }
}

export default DatabaseInfo
