import { Button } from "@mui/material";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../hooks/useRouter";

export const Dashboard = () => {
  const token = useRequireAuth();
  const { signout } = useAuth();
  const { push } = useRouter();
  return (
    <>
      {token && (
        <div>
          <Button
            variant="text"
            onClick={() => {
              signout();
              push("/");
            }}
          >
            SIGN OUT
          </Button>
        </div>
      )}
    </>
  );
};
