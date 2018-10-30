import React, { Component } from "react"
import { Router } from "@reach/router"
import "./App.css"

import Home from "./views/Home/"
import DatabaseList from "./views/Databaselist"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Home path="/" />
          <DatabaseList path="/databases" />
        </Router>
      </div>
    )
  }
}

export default App
