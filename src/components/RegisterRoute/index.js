import React, { Component } from "react"
import { Link } from "@reach/router"
import { getDatabases } from "../../utils/api"

class RegisterRoute extends Component {
  state = {
    database: "",
    route: "",
    method: "GET",
    table: "",
    column: "",
    databases: false,
    tables: false,
    columns: false
  }

  componentDidMount = () => {
    console.log(this.props)
    document.title = "Add route"
    getDatabases()
      .then(rows => this.setState({ databases: rows }))
      .catch(err => console.log)
  }

  getTables() {
    fetch(`${process.env.REACT_APP_API}/build/tables/${this.state.database}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          tables: data
        })
      )
  }

  getColumns() {
    fetch(`${process.env.REACT_APP_API}/build/columns/${this.state.database}/${this.state.table}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: Object.keys(data)
        })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API}/build/register/route`, {
      method: "POST",
      body: JSON.stringify({
        database: this.state.database,
        route: this.state.route,
        method: this.state.method,
        action: `{"from": ["${this.state.table}"], "toReturn": ["${
          this.state.column
        }"]}`
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

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log(this.state)
    if(prevState.database !== this.state.database) {
      this.getTables()
      this.setState({
        table: "",
        column: ""
      })
    }
    if(prevState.table !== this.state.table && this.state.table !== "") {
      this.getColumns()
      this.setState({
        column: ""
      })
    }
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
          <select
            name="database"
            required
            defaultValue=""
          >
            <option disabled value="">
              -- select a database --
            </option>
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
          {this.state.database.length > 0 && (
            <span>
              <label>Route:</label>
              <input name="route" type="text" required />
            </span>
          )}
          {this.state.route.length > 0 && (
            <span>
              <label>Table:</label>
              <select name="table" required value={this.state.table} onChange={() => {}}>
                <option disabled value="">
                  -- select a table --
                </option>
                {this.state.tables ? (
                  this.state.tables.map((data, index) => (
                    <option key={index} value={data.name}>
                      {data.name}
                    </option>
                  ))
                ) : (
                  <option>Loading tables</option>
                )}
              </select>
            </span>
          )}
          {this.state.table.length > 0 && (
            <span>
              <label>Table:</label>
              <select name="column" required value={this.state.column} onChange={() => {}}>
                <option disabled value="">
                  -- select a column --
                </option>
                <option value="*">All</option>
                {this.state.columns ? (
                  this.state.columns.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading columns</option>
                )}
              </select>
            </span>
          )}
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterRoute
