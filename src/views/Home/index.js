import React, { Component } from "react"
import { Link } from "@reach/router"

class Home extends Component {
  componentWillMount = () => {
    document.title = "Build an API - Home"
  }

  render() {
    return (
      <div>
        <h1>Build an API</h1>
        <p>
          Start by going to <Link to="databases">Databases</Link> and select your target database or register
          one.
        </p>
      </div>
    )
  }
}

export default Home
