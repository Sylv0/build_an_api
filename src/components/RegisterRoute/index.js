import React, { Component } from "react"
import { Link } from "@reach/router"
import { getDatabases } from "../../utils/api"

class RegisterRoute extends Component {
  state = {
    database: "1",
    route: "",
    method: "GET",
    action: {},
    databases: false
  }

  componentDidMount = () => {
    console.log(this.props)
    document.title = "Add route"
    getDatabases()
      .then(rows => this.setState({ databases: rows }))
      .catch(err => console.log)
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API}/build/register/route`, {
      method: "POST",
      body: JSON.stringify({
        database: this.state.database,
        route: this.state.route,
        method: this.state.method,
        action: this.state.action
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "omit",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => console.log(err))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidUpdate = () => {
    // console.log(this.state)
  }

  render() {
    return (
      <div>
        <Link to="/databases">Back</Link>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          <label>Database:</label>
          <select name="database">
            {this.state.databases ? (
              this.state.databases.map(data => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))
            ) : (
              <option>Loading databases</option>
            )}
          </select>
          <label>Route:</label>
          <input name="route" type="text" />
          <label>Action:</label>
          <input name="action" type="text" />
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterRoute
