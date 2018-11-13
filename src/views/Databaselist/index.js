import React, { Component } from "react"
import { Link } from "@reach/router"

import RegisterDatabase from '../../components/RegisterDatabase'

import { getDatabases, getRoutes } from "../../utils/api"

class DatabaseList extends Component {
  state = {
    addNew: false
  }

  componentDidMount = () => {
    document.title = "Build an API - Databases"

    getRoutes()
      .then(data => this.setState({ routes: data }))
      .catch(err => console.log(err))

    getDatabases()
      .then(data => this.setState({ databases: data }))
      .catch(err => console.log(err))
  }

  componentWillMount = () => {}

  render() {
    return (
      <div>
        <h2>Databases</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th># routes</th>
            </tr>
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
                    <Link
                      to={`/database/${el.id}`}
                      state={{
                        info: this.state.databases.filter(
                          obj => obj.id === el.id
                        )
                      }}
                    >
                      {el.name}
                    </Link>
                  </td>
                  <td>{el.type}</td>
                  <td>{el.url}</td>
                  <td>
                    {
                      this.state.routes.filter(obj => obj.database === el.id)
                        .length
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <hr />
        <button onClick={() => this.setState({addNew: !this.state.addNew})}>{this.state.addNew ? "Cancel" : "Add new"}</button>
        {this.state.addNew && <RegisterDatabase></RegisterDatabase> }
      </div>
    )
  }
}

export default DatabaseList
