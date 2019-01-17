import React, { Component } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { connect } from "react-redux";

import { getRoutes} from "../../actions/routes-actions";

import RegisterRoute from "../RegisterRoute";

import "react-accessible-accordion/dist/fancy-example.css";

class RouteList extends Component {
  state = {
    addNew: false
  };

  action = action => {
    return JSON.parse(action);
  };

  removeRoute = id => {
    fetch(`${process.env.REACT_APP_API}/build/remove/route/${id}`)
      .then(res => this.props.parent.getRoutes())
      .catch(console.log);
  };

  componentDidMount = () => {
    this.props.onGetRoutes();
  }

  render() {      
    return (
      <div className="container float-left">
        <h5>Routes</h5>
        <Accordion style={{ border: "none" }}>
          {this.props.routes &&
          this.props.routes.length > 0 ? (
            this.props.routes.filter(r => r.database === this.props.parent.state.info.id).map(route => (
              <div className="card" key={route.id} style={{ border: "none" }}>
                <AccordionItem className="card-body">
                  <AccordionItemTitle
                    className="card-title accordion__title accordion__title--animated"
                    style={{
                      userSelect: "none",
                      outline: "none",
                      cursor: "pointer",
                      margin: "0"
                    }}
                  >
                    <div
                      className="accordion__arrow"
                      style={{ position: "relative" }}
                      role="presentation"
                    />
                    <h6 style={{ display: "inline" }}>api/{route.route}</h6>
                    <button
                      className="btn btn-danger btn-sm float-right"
                      onClick={() => this.removeRoute(route.id)}
                    >
                      X
                    </button>
                  </AccordionItemTitle>
                  <AccordionItemBody
                    className="card-text"
                    style={{
                      border: "1px solid lightgray",
                      borderTop: "none",
                      padding: "1rem 1rem 0 1rem"
                    }}
                  >
                    <p>
                      Url:{" "}
                      <a
                        href={`${process.env.REACT_APP_API}/api/${route.route}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{`${process.env.REACT_APP_API}/api/${route.route}`}</a>
                    </p>
                    <p>Method: {route.method}</p>
                    <p>Table: {this.action(route.action).from}</p>
                    <p>
                      Columns: {this.action(route.action).toReturn.join(", ")}
                    </p>
                    <p>
                      {this.action(route.action).limit &&
                        `Limit: ${this.action(route.action).limit}`}
                    </p>
                  </AccordionItemBody>
                </AccordionItem>
              </div>
            ))
          ) : (
            <div>No routes</div>
          )}
        </Accordion>
        <button
          className="btn btn-default mt-3"
          onClick={() => this.setState({ addNew: !this.state.addNew })}
        >
          {this.state.addNew ? "Cancel" : "Add new"}
        </button>
        {this.state.addNew && (
          <RegisterRoute
            update={this.props.parent.getRoutes}
            database={this.props.parent.state.info.id}
            routes={this.props.routes}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ routes }) {  
  return {
    routes
  };
}

const mapActionsToProps = {
  onGetRoutes: getRoutes
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RouteList);
