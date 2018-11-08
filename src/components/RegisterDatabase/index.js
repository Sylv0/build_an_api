import React, { Component } from "react"
import { Link } from "@reach/router"

class RegisterDatabase extends Component {
  componentDidMount = () => {
    document.title = "Add database"
  }

  state = {
    name: "name",
    type: "",
    url: "url",
    user: "root",
    pass: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API}/build/register/database`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "omit",
      mode: "cors"
    })
      .then(res => 
        res.json()
      )
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
          <label>Type:</label>
          <select required name="type" value={this.state.type} onChange={() => {}}>
                <option disabled value="">
                  -- select a database --
                </option>
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
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
          {this.state.type === "mysql" && 
            <span>
              <label>Username: </label>
              <input type="text" name="user" placeholder="root"></input>
              <label>Password: </label>
              <input type="password" name="user" placeholder="password"></input>
            </span>
          }
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterDatabase
