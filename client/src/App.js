import CssBaseline from "@mui/material/CssBaseline";
import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ProvideAuth } from "./hooks/useAuth";

function App() {
  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "light",
          },
        })}
      >
        <CssBaseline />
        <ProvideAuth>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </ProvideAuth>
      </ThemeProvider>
    </>
  );
}

export default App;
