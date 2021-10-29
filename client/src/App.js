import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
