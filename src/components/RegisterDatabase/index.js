import React, { Component } from "react"

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
      .then(res => res.json())
      .then(data => {
        this.props.update()
      })
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
        <form
          onSubmit={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          <div className="form-group">
            <label htmlFor="db_type">Type:</label>
            <select
              className="form-control"
              id="db_type"
              required
              name="type"
              value={this.state.type}
              onChange={() => {}}
            >
              <option disabled value="">
                -- select a database --
              </option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="db_name">Name:</label>
            <input
              className="form-control"
              id="db_name"
              name="name"
              type="text"
              required
            />
            {this.state.type === "mysql" && (
              <small className="form-text text-muted">
                For MySQL this is the name of the database
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="db_url">URL, can be domain, IP or local path:</label>
            <input
              className="form-control"
              id="db_url"
              name="url"
              type="text"
              required
            />
            {this.state.type === "mysql" && (
              <div className="form-group">
                <label htmlFor="db_user">Username: </label>
                <input
                  className="form-control"
                  id="db_user"
                  type="text"
                  name="user"
                  placeholder="root"
                />
                <label htmlFor="db_pass">Password: </label>
                <input
                  className="form-control"
                  id="db_pass"
                  type="password"
                  name="pass"
                  placeholder="password"
                />
              </div>
            )}
          </div>
          <input className="btn btn-default" type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterDatabase
