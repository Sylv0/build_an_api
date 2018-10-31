import React, { Component } from "react"

class RouteList extends Component {
  render() {
    console.log(this.props.parent.state)
    return (
      <div>
        <ul>
          {this.props.parent.state.routes ? (
            this.props.parent.state.routes.map(route => (
              <li key={route.id}>
                api/[
                <a
                  href={`http://localhost:3000/api/${route.route}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {route.route}]
                </a>
              </li>
            ))
          ) : (
            <li>No routes</li>
          )}
        </ul>
      </div>
    )
  }
}

export default RouteList
