import React, { Component } from "react"
import RouteList from "../RouteList"

class DatabaseInfo extends Component {
  state = {}
  componentDidMount = () => {
    this.getRoutes = this.getRoutes.bind(this)
    this.getRoutes()
  }

  getRoutes = () => {
    fetch(`${process.env.REACT_APP_API}/build/routes`)
    .then(res => res.json())
    .then(data =>
      this.setState({
        routes: data.filter(obj => obj.database === this.props.info.id)
      })
    )
  }

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
        <hr />
        <RouteList parent={this} />
      </div>
    )
  }
}

export default DatabaseInfo
