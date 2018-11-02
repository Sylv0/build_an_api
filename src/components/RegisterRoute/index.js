import React, { Component } from "react"
import { Link } from "@reach/router"
import { getDatabases } from "../../utils/api"

class RegisterRoute extends Component {
  state = {
    form: {
      database: this.props.database,
      route: "/",
      method: "GET",
      action: {}
    },
    databases: false
  }

  componentDidMount = () => {
    document.title = "Add route"
    getDatabases()
      .then(rows => this.setState({ databases: rows }))
      .catch(err => console.log)
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${process.env.REACH_APP_API}/build/register/route`, {
      method: "POST",
      body: JSON.stringify(this.state.form),
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
      form: { [e.target.name]: e.target.value }
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
          <select name="type">
            {
                this.state.databases ? this.state.databases.map(data => <option value={data.id}>{data.name}</option>) : <option>Loading databases</option>
            }
          </select>
          <label>
            Name
            {this.state.type === "mysql"
              ? " (for MySQL this is the name of the actual database)"
              : ""}
            :
          </label>
          <input name="name" type="text" />
          <label>URL, can be domain, IP or local path:</label>
          <input name="url" type="text" />
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterRoute
