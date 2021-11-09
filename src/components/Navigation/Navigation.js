import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../AuthenticationButton/AuthenticationButton';
import './Navigation.sass';

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul style={{ display: 'flex' }}>
                <li>
                    <Link to="/">Hawai'i Trails</Link>
                </li>
                <li style={{ flex: 1 }} />
                <li>
                    <Link to="/donate">Donate</Link>
                </li>
                <li>
                    <AuthenticationButton />
                </li>
            </ul>
        </nav>
    );
}
