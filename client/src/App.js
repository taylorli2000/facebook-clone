import CssBaseline from "@mui/material/CssBaseline";
import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Messages } from "./components/Messages";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { ProvideAuth } from "./hooks/useAuth";
import { AppBar } from "./components/AppBar";
import { Box } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProvideAuth>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 1,
            }}
          >
            <AppBar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 1,
                flexGrow: 1,
              }}
            >
              <Switch>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/messages">
                  <Messages />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route exact path="/">
                  <Login />
                </Route>
              </Switch>
            </Box>
          </Box>
        </ProvideAuth>
      </ThemeProvider>
    </>
  );
}

export default App;
