/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import RouteService from "./app/services/RouteService";
import useLogOut from "./app/hooks/useLogOut";

const App = () => {
  const logout = useLogOut();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <RouteService />;
};

export default App;
