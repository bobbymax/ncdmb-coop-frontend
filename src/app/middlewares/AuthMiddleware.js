import { Navigate } from "react-router-dom";
import { useStateContext } from "../providers/ContentProvider";

const AuthMiddleware = (Component) => {
  const { isAuthenticated } = useStateContext();
  return isAuthenticated ? <Component /> : <Navigate to="/auth/login" />;
};

export default AuthMiddleware;
