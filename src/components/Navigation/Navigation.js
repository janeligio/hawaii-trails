import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../AuthenticationButton/AuthenticationButton';
import './Navigation.sass';

export default function Navigation() {
    const { isLoading, isAuthenticated } = useAuth0();

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

                {isAuthenticated && (
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                )}

                <li>
                    {isLoading ? (
                        <button>Loading...</button>
                    ) : (
                        <AuthenticationButton />
                    )}
                </li>
            </ul>
        </nav>
    );
}
