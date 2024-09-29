import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/layouts/navigation/MainNavigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMemo, useState } from "react";
import useCollection from "../hooks/useCollection";
import NavigationController from "../controllers/NavigationController";

const Protected = () => {
  const [selected, setSelected] = useState(false);
  const [currentNav, setCurrentNav] = useState("");

  const memoizedServiceClass = useMemo(() => new NavigationController(), []);
  const { collection } = useCollection(memoizedServiceClass);

  const handleNavToggled = (detail) => {
    if (detail?.current !== currentNav) {
      setCurrentNav(detail?.current);
      setSelected(true);
    } else {
      setCurrentNav("");
      setSelected(false);
    }
  };

  return (
    <>
      {/* Navigation Area */}
      <MainNavigation
        name="Cooperative"
        loggedInUserName="Bobby Ekaro"
        toggleNav={handleNavToggled}
        isToggled={selected}
        isSelected={currentNav}
        items={collection}
      />
      {/* End Navigation Area */}

      <main id="main-content">
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default Protected;
