import React, { Component } from "react"
import {Link} from '@reach/router'

class RouteList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.parent.state.routes ? (
            this.props.parent.state.routes.map(route => (
              <li key={route.id}>
                api/[
                <a
                  href={`${process.env.REACT_APP_API}/api/${route.route}`}
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
        <hr></hr>
        <Link to="/register/route">Add new</Link>
      </div>
    )
  }
}

export default RouteList
