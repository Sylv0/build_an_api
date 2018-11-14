import React, { Component } from "react"
import { Link } from "@reach/router"

import RegisterDatabase from "../../components/RegisterDatabase"

import { getDatabases, getRoutes } from "../../utils/api"

class DatabaseList extends Component {
  state = {
    addNew: false
  }

  routes = () => {
    getRoutes()
      .then(data => this.setState({ routes: data }))
      .catch(err => console.log(err))
  }

  databases = () => {
    getDatabases()
      .then(data => this.setState({ databases: data }))
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    document.title = "Build an API - Databases"

    this.routes = this.routes.bind(this)
    this.databases = this.databases.bind(this)
    this.update = this.update.bind(this)

    this.update()
  }

  update = () => {
    this.setState({
      addNew: false
    })
    this.routes()
    this.databases()
  }

  componentWillMount = () => {}

  render() {
    return (
      <div>
        <h2>Databases</h2>
        <div className="row">
          {this.state.databases ? (
            this.state.databases.map(database => (
              <div class="card col-3">
                <img class="card-img-top" src="holder.js/100x180/" alt="" />
                <div class="card-body">
                  <h4 class="card-title">
                    <Link
                      to={`/database/${database.id}`}
                      state={{
                        info: this.state.databases.filter(
                          obj => obj.id === database.id
                        )
                      }}
                    >
                      {database.name}
                    </Link>
                  </h4>
                  <p class="card-text">{database.type}</p>
                  <p class="card-text">{database.url}</p>
                  <p class="card-text">
                    {
                      this.state.routes.filter(
                        obj => obj.database === database.id
                      ).length
                    }
                    <span> route(s)</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span>No databases, add one</span>
          )}
        </div>
        <hr />
        <button onClick={() => this.setState({ addNew: !this.state.addNew })}>
          {this.state.addNew ? "Cancel" : "Add new"}
        </button>
        {this.state.addNew && <RegisterDatabase update={this.update} />}
      </div>
    )
  }
}

export default DatabaseList
