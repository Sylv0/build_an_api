import React, { Component } from "react"
import { Router } from "@reach/router"
import "./App.css"

import Home from "./views/Home/"
import DatabaseList from "./views/Databaselist"
import Database from "./views/Databaselist/Database"

import RegisterDatabase from "./components/RegisterDatabase"
import RegisterRoute from "./components/RegisterRoute"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Home path="/" />
          <DatabaseList path="/databases" />
          <Database path="/database/:id" />
          <RegisterDatabase path="/register/database" />
          <RegisterRoute path="/register/route" />
        </Router>
      </div>
    )
  }
}

export default App
