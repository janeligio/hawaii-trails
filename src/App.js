import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './pages/home/Home';
import MapExample from './components/MapExample/MapExample';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
function App() {
    return (
        <Router>
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
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
