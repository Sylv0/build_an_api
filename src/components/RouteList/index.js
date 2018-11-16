import React, { Component } from "react"

import RegisterRoute from '../RegisterRoute'

class RouteList extends Component {

  state = {
    addNew: false
  }

  action = action => {
    return JSON.parse(action)
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.parent.state.routes ? (
            this.props.parent.state.routes.map(route => (
              <li key={route.id}>
                api/
                <a
                  href={`${process.env.REACT_APP_API}/api/${route.route}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {route.route}
                </a>
                <span> : </span>
                to {route.method} "{this.action(route.action).toReturn.join(", ")}" from "{this.action(route.action).from}"
              </li>
            ))
          ) : (
            <li>No routes</li>
          )}
        </ul>
        <hr></hr>
        <button className="btn btn-default" onClick={() => this.setState({addNew: !this.state.addNew})}>{this.state.addNew ? "Cancel" : "Add new"}</button>
        { this.state.addNew && <RegisterRoute update={this.props.parent.getRoutes} database={this.props.parent.state.info[0].id} routes={this.props.parent.state.routes}></RegisterRoute>}
      </div>
    )
  }
}

export default RouteList
