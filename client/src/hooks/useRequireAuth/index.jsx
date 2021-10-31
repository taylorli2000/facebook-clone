import { useEffect } from "react";
import { useAuth } from "../useAuth";
import { useRouter } from "../useRouter";

export const useRequireAuth = () => {
  const { token } = useAuth();
  const { push } = useRouter();
  // If there is no token that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, [token, push]);
  return token;
};
