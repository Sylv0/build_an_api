import React, { Component } from "react"

class DatabaseInfo extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.info.name}</td>
              <td>{this.props.info.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatabaseInfo
