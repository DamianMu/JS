import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {

    return (
        <nav>
            <h3>Menu</h3>
            <ul>
                <Link to="/Engineers">
                    <li>Engineers</li>
                </Link>
                <Link to="/Users">
                    <li>Users</li>
                </Link>
                <Link to="Resources">
                    <li>Resources</li>
                </Link>
                <Link to="Tickets">
                    <li>Tickets</li>
                </Link>
                <Link to="Priorities">
                    <li>Priorities</li>
                </Link>
                <Link to="Statuses">
                    <li>Statuses</li>
                </Link>
                <Link to="Categories">
                    <li>Categories</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;