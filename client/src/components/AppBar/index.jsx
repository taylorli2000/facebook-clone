import { useState } from "react";
import {
  AppBar as MaterialAppBar,
  Divider,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle, Home, Message } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../hooks/useRouter";

export const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { signout, token, user } = useAuth();
  const { push } = useRouter();
  const theme = useTheme();
  const desktopSize = useMediaQuery(theme.breakpoints.up("md"));

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

  const handleProfile = () => {
    handleClose();
    push("/profile");
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
          <>
            {!desktopSize && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="messages"
                onClick={() => {
                  push("/messages");
                }}
              >
                <Message />
              </IconButton>
            )}
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
                <ListSubheader>Hello, {user.username}</ListSubheader>
                <Divider />
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                <MenuItem onClick={handleSignout}>Sign out</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </MaterialAppBar>
  );
};
