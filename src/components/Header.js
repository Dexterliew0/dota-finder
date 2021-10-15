import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <Link className="header-link" to="/">
                <h1>Dota 2 Finder</h1>
            </Link>
        </div>
    )
}

export default Header
