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
  Typography,
} from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useRouter } from "../../hooks/useRouter";

export const Settings = () => {
  const token = useRequireAuth();
  const { deleteUser, updateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const pictureRef = useRef();
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await updateUser(
    //   usernameRef.current.value,
    //   emailRef.current.value,
    //   passwordRef.current.value,
    //   pictureRef.current.files[0]
    // );
    // if (response) {
    //   setShowSuccess((prev) => !prev);
    // }
    console.log(pictureRef.current.files[0]);
  };
  const handleDelete = async () => {
    const response = await deleteUser();
    if (response) {
      push("/");
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
      {token && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showSuccess}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Account updated successfully!
            </Alert>
          </Snackbar>
          <Typography variant="h6" gutterBottom component="div">
            Settings
          </Typography>
          <FormGroup
            sx={{
              borderRadius: 1,
              boxShadow: 2,
              p: 2,
              width: { xs: 250, sm: 350, md: 450 },
            }}
          >
            <Stack spacing={2} direction="column">
              <label
                htmlFor="contained-button-file"
                style={{ alignSelf: "flex-start" }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  ref={pictureRef}
                />
                <Button
                  variant="contained"
                  component="span"
                  endIcon={<PhotoCamera />}
                >
                  PICTURE
                </Button>
              </label>
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
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <Typography variant="button" display="block">
                    SAVE
                  </Typography>
                </Button>
                <Button variant="text" color="warning" onClick={handleDelete}>
                  <Typography variant="button" display="block">
                    DELETE ACCOUNT
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </FormGroup>
        </Box>
      )}
    </>
  );
};
