/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from "../providers/ContentProvider";
import { useNavigate } from "react-router-dom";
import GuardedApiService from "../services/GuardedApiService";

const useLogOut = () => {
  const { setIsAuthenticated, setAuth, setToken } = useStateContext();
  const navigate = useNavigate();

  const logout = async () => {
    const auth = new GuardedApiService();

    const response = await auth.logout();
    console.log(response);

    setIsAuthenticated(false);
    setAuth({});
    setToken("");
    navigate("/auth/login");
  };

  return logout;
};

export default useLogOut;
