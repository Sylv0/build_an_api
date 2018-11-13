import React, { Component } from "react"
import { Router } from "@reach/router"
import "./App.css"

import Home from "./views/Home/"
import DatabaseList from "./views/Databaselist"
import Database from "./views/Databaselist/Database"
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Nav></Nav>
        <Router className="col-10">
          <Home path="/" />
          <DatabaseList path="/databases" />
          <Database path="/database/:id" />
        </Router>
      </div>
    )
  }
}

export default App
