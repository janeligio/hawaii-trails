import { useAuth0 } from '@auth0/auth0-react';

/** TODO:
 * You can pass a configuration object to loginWithRedirect() to customize the login experience. For example, you can pass options to redirect users to an Auth0 Universal Login page optimized for signing up for your React application. See RedirectLoginOptions for more details on these options.
 * https://auth0.com/blog/complete-guide-to-react-user-authentication/#Get-the-Starter-Application
 */

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
