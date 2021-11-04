import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
    <div className="App">
      <Navigation />
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
