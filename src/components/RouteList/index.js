import React, { Component } from "react"

import RegisterRoute from '../RegisterRoute'

class RouteList extends Component {

  state = {
    addNew: false
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
                to {route.method} "{JSON.parse(route.action).toReturn}"
              </li>
            ))
          ) : (
            <li>No routes</li>
          )}
        </ul>
        <hr></hr>
        <button onClick={() => this.setState({addNew: !this.state.addNew})}>{this.state.addNew ? "Cancel" : "Add new"}</button>
        { this.state.addNew && <RegisterRoute update={this.props.parent.getRoutes}></RegisterRoute>}
      </div>
    )
  }
}

export default RouteList
