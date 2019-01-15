import React, { Component } from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";

import { getRoutes } from "../../../actions/routes-actions";

import DatabaseInfo from "../../../components/DatabaseInfo";
import RouteList from "../../../components/RouteList";

class Database extends Component {
  state = {};

  componentDidMount = () => {
    this.props.onGetRoutes();
    this.getRoutes = this.getRoutes.bind(this);
    this.setState(
      {
        info: this.props.location.state.info[0]
      },
      this.getRoutes
    );
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    prevProps.routes !== this.props.routes &&
      this.setState({
        routes: this.props.routes.filter(
          obj => obj.database === this.state.info.id
        )
      });
  };

  getRoutes = () => {
    this.props.onGetRoutes();
  };

  render() {
    const info = this.props.location.state.info[0];
    const routes = this.props.routes.filter(obj => obj.database === info.id);

    return (
      <div>
        <Link to="/databases">Back to list</Link>
        {!this.state.info ? (
          <span>
            Database might be loading... If this doesn't go away, got back to
            <Link to="/databases">Databases</Link>.
          </span>
        ) : (
          <div className="container-fluid">
            <DatabaseInfo info={this.state.info} />
            <hr />
            <RouteList parent={this} />
          </div>
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
)(Database);
