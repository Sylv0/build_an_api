import React, { Component } from "react";
import { Link } from "@reach/router";

import RegisterDatabase from "../../components/RegisterDatabase";

// import { getRoutes } from "../../utils/api"
import Octicon, { X } from "@githubprimer/octicons-react";

import { connect } from "react-redux";
import { getDatabases, saveDatabase } from "../../actions/databases-actions";
import { getRoutes } from "../../actions/routes-actions";

class DatabaseList extends Component {
  state = {
    addNew: false
  };

  // databases = () => {
  //   getDatabases()
  //     .then(data => {
  //       if(data.error !== true)
  //         this.setState({ databases: data })
  //       else
  //         this.setState({databases: false})
  //     })
  //     .catch(err => console.log(err))
  // }

  componentDidMount = () => {
    document.title = "Build an API - Databases";

    // this.databases = this.databases.bind(this)
    this.update = this.update.bind(this);

    this.update();

    this.props.onGetDatabases();
    this.props.onGetRoutes();
  };

  update = () => {
    this.setState({
      addNew: false
    });
    // this.databases()
  };

  delete = id => {
    if (!window.confirm("Are you sure?")) return;
    fetch(`${process.env.REACT_APP_API}/build/remove/database/${id}`).then(
      res => {
        this.update();
      }
    );
  };

  componentWillMount = () => {};

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Databases</h2>
        <div className="row">
          {this.props.databases ? (
            this.props.databases.map(database => (
              <div
                className="card col-xs-12 col-sm-6 col-lg-3"
                key={database.id}
              >
                <div className="card-body">
                  <a
                    href={database.name}
                    className="float-right text-danger"
                    onClick={e => {
                      e.preventDefault();
                      this.delete(database.id);
                    }}
                  >
                    <Octicon icon={X} />
                  </a>
                  <h4 className="card-title">
                    <Link
                      to={`/database/${database.id}`}
                      state={{
                        info: this.props.databases.filter(
                          obj => obj.id === database.id
                        )
                      }}
                    >
                      {database.name}
                    </Link>
                  </h4>
                  <p className="card-text">{database.type}</p>
                  <p className="card-text">{database.url}</p>
                  <p className="card-text">
                    {this.props.routes &&
                      this.props.routes.filter(
                        obj => obj.database === database.id
                      ).length}
                    <span> route(s)</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span>No databases, add one</span>
          )}
        </div>
        <hr />
        <button
          className="btn btn-default"
          onClick={() => this.setState({ addNew: !this.state.addNew })}
        >
          {this.state.addNew ? "Cancel" : "Add new"}
        </button>
        {this.state.addNew && <RegisterDatabase update={this.update} />}
      </div>
    );
  }
}

const mapStateToProps = ({ databases, routes }) => {
  return {
    databases,
    routes
  };
};

const mapActionsToProps = {
  onGetDatabases: getDatabases,
  onSaveDatabase: saveDatabase,
  onGetRoutes: getRoutes
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DatabaseList);
