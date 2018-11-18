import React, { Component } from "react"
import { getDatabases } from "../../utils/api"

class RegisterRoute extends Component {
  state = {
    database: "",
    route: "",
    method: "GET",
    table: "",
    column: [],
    limit: "",
    databases: false,
    tables: false,
    columns: false
  }

  componentDidMount = () => {
    document.title = "Add route"
    getDatabases()
      .then(rows => this.setState({ databases: rows }))
      .catch(err => console.log)
    if (this.props.database)
      this.setState({ database: this.props.database.toString() })
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
    fetch(
      `${process.env.REACT_APP_API}/build/columns/${this.state.database}/${
        this.state.table
      }`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: Object.keys(data)
        })
      })
  }

  handleSubmit = e => {
    e.preventDefault()

    let action = {
      from: [this.state.table],
      toReturn: this.state.column
    }

    if (this.state.limit > 0) action["limit"] = this.state.limit

    fetch(`${process.env.REACT_APP_API}/build/register/route`, {
      method: "POST",
      body: JSON.stringify({
        database: this.state.database,
        route: this.state.route,
        method: this.state.method,
        action: JSON.stringify(action)
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "omit",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        this.props.update()
        alert(data.message)
      })
      .catch(err => console.log(err))
  }

  handleChange = e => {
    if (e.target.name === "column[]") {
      let temp_arr = this.state.column
      if (e.target.checked) temp_arr.push(e.target.value)
      else temp_arr = temp_arr.filter(col => col !== e.target.value)
      this.setState({
        column: temp_arr
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.database !== this.state.database) {
      this.getTables()
      this.setState({
        table: "",
        column: []
      })
    }
    if (prevState.table !== this.state.table && this.state.table !== "") {
      this.getColumns()
      this.setState({
        column: []
      })
    }
  }

  setCheckboxes = e => {
    document.forms[0].elements["column[]"].forEach(check => {
      check.checked = !e.target.value
    })

    this.setState({
      column: !e.target.value ? ["*"] : []
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          <div className="form-group">
            <label htmlFor="r_db">Database:</label>
            <select
              id="r_db"
              name="database"
              required
              value={this.state.database}
              onChange={() => {}}
              className="form-control"
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
                <option disabled value="loading">
                  Loading databases...
                </option>
              )}
            </select>
          </div>
          {this.state.database.length > 0 && (
            <div className="form-group">
              <label>Route:</label>
              <input className="form-control" name="route" type="text" required />
            </div>
          )}
          {this.state.route.length > 0 && (
            <div className="form-group">
              <label htmlFor="r_table">Table:</label>
              <select
              id="r_table"
              className="form-control"
                name="table"
                required
                value={this.state.table}
                onChange={() => {}}
              >
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
                  <option disabled value="loading">
                    Loading tables...
                  </option>
                )}
              </select>
            </div>
          )}
          {this.state.table.length > 0 && this.state.columns && (
            <div>
              <label>Columns:</label>
              <div>
                <button className="btn btn-primary btn-sm" type="button" onClick={this.setCheckboxes} value="">
                  +
                </button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={this.setCheckboxes} value="a">
                  -
                </button>
              </div>
              {this.state.columns.map(col => (
                <div className="form-group form-check" key={col}>
                  <input id={`check_${col}`} className="form-check-input" type="checkbox" name="column[]" value={col} />
                  <label className="form-check-label" htmlFor={`check_${col}`}>{col}</label>
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="r_limit">Limit(0 for no limit)</label>
                <input id="r_limit" className="form-control" type="number" min="0" name="limit" />
              </div>
            </div>
          )}
          <input className="btn btn-default" type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default RegisterRoute
