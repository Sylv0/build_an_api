import React, { Component } from "react"
import { Link } from "@reach/router"

class RegisterDatabase extends Component {
  componentDidMount = () => {
    document.title = "Add database"
  }

  state = {
    name: "name",
    type: "sqlite",
    url: "url",
    user: "root",
    pass: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/build/register/database", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "omit",
      mode: "cors"
    })
      .then(res => console.log(res))
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
          <label>Type:</label>
          <select name="type">
            <option value="sqlite">SQLite</option>
            <option value="mysql">MySQL</option>
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

export default RegisterDatabase
