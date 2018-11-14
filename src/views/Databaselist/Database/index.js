import React, { Component } from "react"
import { Link } from "@reach/router"
import DatabaseInfo from "../../../components/DatabaseInfo"
import RouteList from "../../../components/RouteList"

class Database extends Component {
  state = {}

  componentDidMount = () => {
    this.getRoutes = this.getRoutes.bind(this)
    this.setState({ info: this.props.location.state.info }, () => {
      this.getRoutes()
    })
  }

  getRoutes = () => {
    fetch(`${process.env.REACT_APP_API}/build/routes`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          routes: data.filter(obj => obj.database === this.state.info[0].id)
        })
      })
  }

  render() {
    return (
      <div>
        <Link to="/databases">Back to list</Link>
        <h3>A database</h3>
        {!this.state.info ? (
          <span>
            Database might be loading... If this doesn't go away, got back to
            <Link to="/databases">Databases</Link>.
          </span>
        ) : (
          <div>
            <DatabaseInfo info={this.state.info[0]} />
            <hr />
            <RouteList parent={this} />
          </div>
        )}
      </div>
    )
  }
}

export default Database
