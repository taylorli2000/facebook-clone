import { useRequireAuth } from "../../hooks/useRequireAuth";

export const Dashboard = () => {
  const token = useRequireAuth();

  return <>{token && <div>Dashboard works</div>}</>;
};
