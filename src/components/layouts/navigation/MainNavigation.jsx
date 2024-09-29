import { Menu, NavBrand, Navigation, Profile, ToggleMenu } from ".";
import Button from "../../forms/Button";
// import { useNavigate } from "react-router-dom";

const MainNavigation = ({
  name = "",
  loggedInUserName = "",
  toggleNav = undefined,
  isToggled = false,
  isSelected = "",
  items = [],
}) => {
  // const navigate = useNavigate();

  const handleReferesh = () => {
    window.location.reload();
  };
  return (
    <Navigation>
      {/* Brand Section */}
      <NavBrand name={name} />
      {/* End Brand Section */}
      {/* Toggle Button */}
      <ToggleMenu />
      {/* End Toggle Button */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Menu
          items={items}
          handleNavToggle={toggleNav}
          navSelected={isSelected}
          toggle={isToggled}
        />
        {/* Search Input Section */}
        {/* <Search /> */}
        {/* End Search Section */}
      </div>
      {/* Profile Section */}
      <Profile name={loggedInUserName} />
      {/* End Profile Section */}
      {/* Profile Section */}
      <div
        style={{
          marginLeft: 12,
        }}
      >
        <Button
          label="Logout"
          icon="log-out"
          handleClick={() => handleReferesh()}
          variant="danger"
        />
      </div>
      {/* End Profile Section */}
    </Navigation>
  );
};

export default MainNavigation;
