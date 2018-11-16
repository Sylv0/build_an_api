import React, { Component } from "react"

import RegisterRoute from '../RegisterRoute'

class RouteList extends Component {

  state = {
    addNew: false
  }

  action = action => {
    return JSON.parse(action)
  }

  removeRoute = id => {
    fetch(`${process.env.REACT_APP_API}/build/remove/route/${id}`)
    .then(res => this.props.parent.getRoutes())
    .catch(console.log)
  }

  render() {
    return (
      <div>
        <h5>Routes</h5>
        <ul className="list-group list-group-flush">
          {this.props.parent.state.routes ? (
            this.props.parent.state.routes.map(route => (
              <li className="list-group-item" key={route.id}>
                api/
                <a
                  href={`${process.env.REACT_APP_API}/api/${route.route}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {route.route}
                </a>
                <span> : </span>
                to {route.method}{this.action(route.action).limit ? ` ${this.action(route.action).limit}` : " all"} rows of "{this.action(route.action).toReturn.join(", ")}" from table "{this.action(route.action).from}"
                <button className="btn btn-danger btn-sm float-right" onClick={() => this.removeRoute(route.id)}>X</button>
              </li>
            ))
          ) : (
            <li>No routes</li>
          )}
        </ul>
        <button className="btn btn-default" onClick={() => this.setState({addNew: !this.state.addNew})}>{this.state.addNew ? "Cancel" : "Add new"}</button>
        { this.state.addNew && <RegisterRoute update={this.props.parent.getRoutes} database={this.props.parent.state.info[0].id} routes={this.props.parent.state.routes}></RegisterRoute>}
      </div>
    )
  }
}

export default RouteList
