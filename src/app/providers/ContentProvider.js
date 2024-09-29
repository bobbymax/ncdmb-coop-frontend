import { createContext, useContext, useState } from "react";

const StateContext = createContext({});

export const ContentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState("");

  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
