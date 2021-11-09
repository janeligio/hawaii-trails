import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

import esriConfig from '@arcgis/core/config.js';
// Components/Pages
import Navigation from './components/Navigation/Navigation';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './App.css';

esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

function App() {
    return (
        <Router>
            <Auth0ProviderWithHistory>
                <div className="App">
                    <Navigation />
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <ProtectedRoute path="/profile" component={Profile} />
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Auth0ProviderWithHistory>
        </Router>
    );
}

export default App;
