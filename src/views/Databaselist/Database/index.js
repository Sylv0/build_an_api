import React, { Component } from 'react';
import {Link} from '@reach/router';

class Database extends Component {
    state = {}
    render() {
        return (
            <div>
                <h3>A database</h3>
                {!this.state.info ? <p> Database might be loading, if this doesn't go away, got back to <Link to="/databases">Databases</Link></p> : <p></p>}
            </div>
        );
    }
}

export default Database;