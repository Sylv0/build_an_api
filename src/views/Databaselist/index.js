import React, { Component } from "react"
import { Link } from "@reach/router"

require('dotenv').config()

class DatabaseList extends Component {

    state = {}

  componentDidMount = () => {
      console.log(process.env.API_BASE_URL)
    document.title = "Build an API - Databases"
    fetch(`http://localhost:3000/build/databases`)
      .then(res => res.json())
      .then(data => this.setState({databases: data}))
  }

  componentWillMount = () => {
      
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Databases</h2>
        <ul>
            {!this.state.databases ? <p>No databases loaded</p> : this.state.databases.map(el => <li key={el.id}>{el.name} | {el.type} | {el.url}</li>)}
        </ul>
      </div>
    )
  }
}

export default DatabaseList
