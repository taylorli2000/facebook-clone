import { useContext, createContext } from "react";
import { useLocalStorage } from "../useLocalStorage";

const BASE_URL = "http://localhost:8000/api/auth/";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [token, setToken] = useLocalStorage("token");

  // Wrap any methods we want to use making sure ...
  // ... to save the token to local storage.
  const signin = async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      return true;
    }
  };

  const signup = async (username, email, password) => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    if (data.success) {
      return true;
    }
  };

  const signout = () => {
    setToken();
  };

  const deleteUser = async () => {
    const response = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      signout();
      return true;
    }
  };

  const updateUser = async (username, email, password) => {
    const changes = { username: username, email: email, password: password };
    const response = await fetch(BASE_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    const data = await response.json();
    if (data.user) {
      return true;
    }
  };
  // Return the token object and auth methods
  return {
    token,
    signin,
    signup,
    signout,
    deleteUser,
    updateUser,
  };
};
