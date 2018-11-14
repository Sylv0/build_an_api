import React, { Component } from "react"
import { Link } from "@reach/router"

import RegisterDatabase from "../../components/RegisterDatabase"

import { getDatabases, getRoutes } from "../../utils/api"
import Octicon, {X} from "@githubprimer/octicons-react";

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

  delete = (id) => {
    if(!window.confirm("Are you sure?")) return
    fetch(`${process.env.REACT_APP_API}/build/remove/database/${id}`)
    .then(res => {
      this.update();
    })
  }

  componentWillMount = () => {}

  render() {
    return (
      <div>
        <h2>Databases</h2>
        <div className="row">
          {this.state.databases ? (
            this.state.databases.map(database => (
              <div className="card col-xs-12 col-sm-6 col-lg-3" key={database.id}>
                <div className="card-body">
                <a href={database.name} className="float-right text-danger" onClick={e => {
                  e.preventDefault()
                  this.delete(database.id)
                }}><Octicon icon={X}></Octicon></a>
                  <h4 className="card-title">
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
                  <p className="card-text">{database.type}</p>
                  <p className="card-text">{database.url}</p>
                  <p className="card-text">
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
