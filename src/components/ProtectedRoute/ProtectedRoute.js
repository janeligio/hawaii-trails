import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export default function ProtectedRoute({ component, ...args }) {
    return (
        <Route
            component={withAuthenticationRequired(component, {
                onRedirecting: () => <h1>Loading...</h1>,
            })}
            {...args}
        />
    );
}
