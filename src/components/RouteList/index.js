import React, { Component } from "react"

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion'

import RegisterRoute from '../RegisterRoute'

import 'react-accessible-accordion/dist/minimal-example.css';

class RouteList extends Component {

  state = {
    addNew: false
  }

  action = action => {
    return JSON.parse(action)
  }

  removeRoute = id => {
    fetch(`${process.env.REACT_APP_API}/build/remove/route/${id}`)
      .then(res => this.props.parent.getRoutes())
      .catch(console.log)
  }

  render() {
    console.log(this.props.parent.state.routes);
    
    return (
      <div className="container float-left">
        <h5>Routes</h5>
        <Accordion>
          {this.props.parent.state.routes ? (
            this.props.parent.state.routes.map(route => (
              <div className="card" key={route.id}>
                <AccordionItem className="card-body">
                  <AccordionItemTitle className="card-title">
                    <h6 style={{ display: "inline" }}>api/{route.route}</h6>
                    <button className="btn btn-danger btn-sm float-right" onClick={() => this.removeRoute(route.id)}>X</button>
                  </AccordionItemTitle>
                  <AccordionItemBody className="card-text">
                    <p>Url: <a href={`${process.env.REACT_APP_API}/api/${route.route}`}
                      target="_blank"
                      rel="noopener noreferrer">{`${process.env.REACT_APP_API}/api/${route.route}`}</a></p>
                    <p>Method: {route.method}</p>
                    <p>Table: {this.action(route.action).from}</p>
                    <p>Columns: {this.action(route.action).toReturn.join(", ")}</p>
                  </AccordionItemBody>
                </AccordionItem>
              </div>
            ))
          ) : (
              <li>No routes</li>
            )}
        </Accordion>
        <button className="btn btn-default" onClick={() => this.setState({ addNew: !this.state.addNew })}>{this.state.addNew ? "Cancel" : "Add new"}</button>
        {this.state.addNew && <RegisterRoute update={this.props.parent.getRoutes} database={this.props.parent.state.info[0].id} routes={this.props.parent.state.routes}></RegisterRoute>}
      </div>
    )
  }
}

export default RouteList
