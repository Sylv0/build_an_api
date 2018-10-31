import React, { Component } from "react"
import { Link } from "@reach/router"
import DatabaseInfo from "../../../components/DatabaseInfo"

class Database extends Component {
  state = {}

  componentDidMount = () => {
    this.setState({ info: this.props.location.state.info })
  }

  render() {
    return (
      <div>
          <Link to="/databases">Back to list</Link>
        <h3>A database</h3>
        {!this.state.info ? (
          <p>
            {" "}
            Database might be loading... If this doesn't go away, got back to{" "}
            <Link to="/databases">Databases</Link>.
          </p>
        ) : (
            <DatabaseInfo info={this.state.info[0]} />
        )}
      </div>
    )
  }
}

export default Database
