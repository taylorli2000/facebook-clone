import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

export const Signup = (props) => {
  const { setShowSignup } = props;
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    if (response) {
      setShowSuccess((prev) => !prev);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess((prev) => !prev);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Account created successfully!
        </Alert>
      </Snackbar>
      <Box sx={{ fontWeight: "medium", mb: 1 }}>Sign up</Box>
      <FormGroup
        sx={{
          borderRadius: 1,
          boxShadow: 2,
          p: 2,
          width: { sm: 325, md: 375 },
        }}
      >
        <Stack spacing={2} direction="column">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            inputRef={usernameRef}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            inputRef={emailRef}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            inputRef={passwordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              SIGN UP
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setShowSignup((prev) => !prev);
              }}
            >
              LOGIN
            </Button>
          </Stack>
        </Stack>
      </FormGroup>
    </>
  );
};
