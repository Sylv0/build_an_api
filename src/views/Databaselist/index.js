import React, { Component } from "react"
import { Link } from "@reach/router"

import {getDatabases, getRoutes} from '../../utils/api';

require("dotenv").config()

class DatabaseList extends Component {
  state = {}

  componentDidMount = () => {
    console.log(process.env.API_BASE_URL)
    document.title = "Build an API - Databases"
    
    getRoutes()
    .then(data => this.setState({routes: data}))
    .catch(err => console.log(err))

    getDatabases()
    .then(data => this.setState({databases: data}))
    .catch(err => console.log(err))
  }

  componentWillMount = () => {}

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Databases</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Type</th><th>Address</th><th># routes</th></tr>
          </thead>
          <tbody>
            {!this.state.databases || !this.state.routes ? (
              <tr>
                <td>No databases loaded</td>
              </tr>
            ) : (
              this.state.databases.map(el => (
                <tr key={el.id}>
                  <td>
                    <Link to={`/database/${el.id}`} state={{info: this.state.databases.filter(obj => obj.id === el.id)}}>{el.name}</Link>
                  </td>
                  <td>{el.type}</td>
                  <td>{el.url}</td>
                  <td>{this.state.routes.filter(obj => obj.database === el.id).length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DatabaseList
