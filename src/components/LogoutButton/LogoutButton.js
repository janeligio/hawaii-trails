import { useAuth0 } from '@auth0/auth0-react';

/** TODO:
The logout() method exposed by Auth0Context clears the application session and redirects to the Auth0 /v2/logout endpoint to clear the Auth0 session. As with the login methods, you can pass an object argument to logout() to define parameters for the /v2/logout call. This process is fairly invisible to the user. See LogoutOptions for more details. * https://auth0.com/blog/complete-guide-to-react-user-authentication/#Get-the-Starter-Application
 */

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <button
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
