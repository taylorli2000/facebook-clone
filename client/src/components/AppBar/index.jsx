import { useState } from "react";
import {
  AppBar as MaterialAppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../hooks/useRouter";

export const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, signout } = useAuth();
  const { push } = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout = () => {
    handleClose();
    signout();
    push("/");
  };
  const handleSettings = () => {
    handleClose();
    push("/settings");
  };

  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          onClick={() => {
            push("/");
          }}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Facebook
        </Typography>
        {token && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleSignout}>Sign out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </MaterialAppBar>
  );
};
