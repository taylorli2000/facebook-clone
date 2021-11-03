import { useRequireAuth } from "../../hooks/useRequireAuth";

export const Messages = () => {
  const token = useRequireAuth();

  return <>{token && <div>Messages works</div>}</>;
};
