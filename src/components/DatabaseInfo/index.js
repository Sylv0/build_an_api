import React, { Component } from "react"
import RouteList from "../RouteList"

class DatabaseInfo extends Component {
  state = {}
  componentDidMount = () => {
    fetch("http://localhost:3000/build/routes")
      .then(res => res.json())
      .then(data =>
        this.setState({routes: data.filter(obj => obj.database === this.props.info.id)})
      )
  }
  render() {
    // console.log(this.props.info)
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
        <hr />
        <RouteList parent={this} />
      </div>
    )
  }
}

export default DatabaseInfo
