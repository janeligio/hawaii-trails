import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

// Components/Pages
import Navigation from './components/Navigation/Navigation';
import Home from './pages/home/Home';
import MapExample from './components/MapExample/MapExample';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';

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
                        <Route exact path="/">
                            {/* <Home /> */}
                            <h1>home</h1>
                        </Route>
                    </Switch>
                </div>
            </Auth0ProviderWithHistory>
        </Router>
    );
}

export default App;
