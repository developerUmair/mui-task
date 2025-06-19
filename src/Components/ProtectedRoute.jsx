import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/auth/sign-up" replace />;
  return children;
};

export default ProtectedRoute;
