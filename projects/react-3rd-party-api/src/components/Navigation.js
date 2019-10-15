import React from 'react';
import { withRouter, NavLink } from "react-router-dom";
import '../styles/nav.css';
import { routes } from '../common/routes';

function Navigation() {
    return (
        <div>
            <nav>
                <ul>
                    {Object.keys(routes).map(item => (
                        <li key={item}>
                            <NavLink 
                                activeClassName="selected"
                                exact
                                to={routes[item].path}
                            >
                                {routes[item].name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);
