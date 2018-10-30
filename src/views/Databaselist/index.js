import React, { Component } from "react"
import { Link } from "@reach/router"

class DatabaseList extends Component {
  componentDidMount = () => {
    document.title = "Build an API - Databases"
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Databases</h2>
      </div>
    )
  }
}

export default DatabaseList
