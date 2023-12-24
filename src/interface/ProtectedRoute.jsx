import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/Users/useGetCurrentUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { data, isLoading, isAuthenticated } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !data) navigate("/login");
  }, [isAuthenticated, isLoading, navigate, data]);

  if (isLoading)
    return (
      <div className="h-screen justify-center items-center bg-zinc-800">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
