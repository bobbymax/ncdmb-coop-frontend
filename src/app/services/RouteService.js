import { Route, Routes } from "react-router-dom";
import routes from "../routes/config";
import Protected from "../guards/Protected";
import { Suspense } from "react";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import Guest from "../guards/Guest";

const RouteService = () => {
  const authenticatedRoutes = () => {
    return routes
      .filter((route) => route.requiresAuth)
      .map(({ path, component: Component, exact, requiresAuth }, index) => {
        return (
          <Route
            key={index}
            element={<Component />}
            path={path}
            exact={exact}
          />
        );
      });
  };

  const guestRoutes = () => {
    return routes
      .filter((route) => !route.requiresAuth)
      .map(({ path, component: Component, exact, requiresAuth }, i) => {
        return (
          <Route key={i} element={<Component />} path={path} exact={exact} />
        );
      });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route element={<Guest />}>{guestRoutes()}</Route>
        <Route element={AuthMiddleware(Protected)}>
          {authenticatedRoutes()}
          <Route path="*" element={<p>Page Not Found!!</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouteService;
