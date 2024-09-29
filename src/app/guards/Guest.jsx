import { Outlet } from "react-router-dom";

const Guest = () => {
  return (
    <div id="guest-wrapper">
      <div className="header-area"></div>
      <Outlet />
    </div>
  );
};

export default Guest;
