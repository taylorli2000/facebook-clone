import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Signup } from "../Signup";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../hooks/useRouter";

export const Login = () => {
  const { signin } = useAuth();
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signin(
      emailRef.current.value,
      passwordRef.current.value
    );
    if (response) {
      push("/dashboard");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 1,
        height: 1,
      }}
    >
      {(showSignup && <Signup setShowSignup={setShowSignup} />) || (
        <>
          <Box sx={{ fontWeight: "medium", mb: 1 }}>Login</Box>
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
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  LOGIN
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setShowSignup((prev) => !prev);
                  }}
                >
                  SIGN UP
                </Button>
              </Stack>
            </Stack>
          </FormGroup>
        </>
      )}
    </Box>
  );
};
