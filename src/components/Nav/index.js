import React, { Component } from 'react';
import {Link} from '@reach/router'
import Octicons, {Database, Home} from '@githubprimer/octicons-react'

class Nav extends Component {
    render() {
        return (
            <div className="col-1">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <Link to="/" className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                        <Octicons size="medium" icon={Home}></Octicons>
                    </Link>
                    <Link to="/databases" className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                        <Octicons size="medium" icon={Database}>
                    </Octicons></Link>
                </div>
            </div>
        );
    }
}

export default Nav;